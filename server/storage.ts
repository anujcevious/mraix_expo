import { 
  users, type User, type InsertUser,
  companies, type Company,
  customers, type Customer,
  vendors, type Vendor,
  invoices, type Invoice,
  creditNotes, type CreditNote,
  receipts, type Receipt,
  purchases, type Purchase,
  debitNotes, type DebitNote,
  payments, type Payment,
  favorites, type Favorite, type InsertFavorite,
  notifications, type Notification
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;
  updateUserLastLogin(id: number): Promise<void>;
  
  // Company operations
  getCompany(id: number): Promise<Company | undefined>;
  updateCompany(id: number, userId: number, updates: Partial<Company>): Promise<void>;
  
  // Favorites operations
  getFavorites(userId: number): Promise<Favorite[]>;
  createFavorite(favorite: InsertFavorite): Promise<Favorite>;
  deleteFavorite(id: number, userId: number): Promise<void>;
  
  // Notification operations
  getNotifications(userId: number): Promise<Notification[]>;
  markNotificationsAsRead(ids: number[], userId: number): Promise<void>;
  markAllNotificationsAsRead(userId: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private companies: Map<number, Company>;
  private favorites: Map<number, Favorite>;
  private notifications: Map<number, Notification>;
  private currentUserId: number;
  private currentCompanyId: number;
  private currentFavoriteId: number;
  private currentNotificationId: number;

  constructor() {
    this.users = new Map();
    this.companies = new Map();
    this.favorites = new Map();
    this.notifications = new Map();
    this.currentUserId = 1;
    this.currentCompanyId = 1;
    this.currentFavoriteId = 1;
    this.currentNotificationId = 1;
    
    // Initialize with a demo user
    const adminUser: User = {
      id: this.currentUserId++,
      username: "admin",
      password: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", // sha256('admin')
      name: "John Doe",
      email: "john.doe@mraixexpo.com",
      role: "Administrator",
      lastLogin: new Date(),
      avatar: "",
      bio: "",
      phone: "+1 (555) 123-4567",
      createdAt: new Date()
    };
    this.users.set(adminUser.id, adminUser);
    
    // Initialize with a demo company
    const demoCompany: Company = {
      id: this.currentCompanyId++,
      name: "MrAix Corp.",
      industry: "technology",
      address: "123 Tech Avenue, San Francisco, CA 94107",
      taxId: "TAX-12345-US",
      logo: "",
      userId: adminUser.id,
      createdAt: new Date()
    };
    this.companies.set(demoCompany.id, demoCompany);
    
    // Initialize with demo favorites
    const demoFavorites: Favorite[] = [
      {
        id: this.currentFavoriteId++,
        userId: adminUser.id,
        menuId: "invoice",
        path: "/sales/invoice",
        label: "Invoices",
        icon: "file-invoice",
        parent: "sales",
        createdAt: new Date()
      },
      {
        id: this.currentFavoriteId++,
        userId: adminUser.id,
        menuId: "report",
        path: "/report/report",
        label: "Reports",
        icon: "chart-line",
        parent: "report",
        createdAt: new Date()
      }
    ];
    
    demoFavorites.forEach(favorite => {
      this.favorites.set(favorite.id, favorite);
    });
    
    // Initialize with demo notifications
    const demoNotifications: Notification[] = [
      {
        id: this.currentNotificationId++,
        userId: adminUser.id,
        title: "New Invoice Created",
        description: "Invoice #INV-2023-004 has been created",
        type: "invoice",
        read: false,
        createdAt: new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago
      },
      {
        id: this.currentNotificationId++,
        userId: adminUser.id,
        title: "Sales Report Ready",
        description: "Monthly sales report for April is ready to view",
        type: "report",
        read: false,
        createdAt: new Date(Date.now() - 60 * 60 * 1000) // 1 hour ago
      },
      {
        id: this.currentNotificationId++,
        userId: adminUser.id,
        title: "New Team Member",
        description: "Sarah Johnson has joined your team",
        type: "user",
        read: false,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      }
    ];
    
    demoNotifications.forEach(notification => {
      this.notifications.set(notification.id, notification);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      lastLogin: null,
      avatar: "",
      bio: "",
      phone: "",
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async updateUserLastLogin(id: number): Promise<void> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    user.lastLogin = new Date();
    this.users.set(id, user);
  }
  
  // Company operations
  async getCompany(id: number): Promise<Company | undefined> {
    return this.companies.get(id);
  }
  
  async updateCompany(id: number, userId: number, updates: Partial<Company>): Promise<void> {
    const company = this.companies.get(id);
    if (!company) {
      throw new Error(`Company with ID ${id} not found`);
    }
    
    if (company.userId !== userId) {
      throw new Error(`User with ID ${userId} does not own company with ID ${id}`);
    }
    
    const updatedCompany = { ...company, ...updates };
    this.companies.set(id, updatedCompany);
  }
  
  // Favorites operations
  async getFavorites(userId: number): Promise<Favorite[]> {
    return Array.from(this.favorites.values()).filter(
      (favorite) => favorite.userId === userId,
    );
  }
  
  async createFavorite(favorite: InsertFavorite): Promise<Favorite> {
    const id = this.currentFavoriteId++;
    const newFavorite: Favorite = {
      ...favorite,
      id,
      createdAt: new Date()
    };
    this.favorites.set(id, newFavorite);
    return newFavorite;
  }
  
  async deleteFavorite(id: number, userId: number): Promise<void> {
    const favorite = this.favorites.get(id);
    if (!favorite) {
      throw new Error(`Favorite with ID ${id} not found`);
    }
    
    if (favorite.userId !== userId) {
      throw new Error(`User with ID ${userId} does not own favorite with ID ${id}`);
    }
    
    this.favorites.delete(id);
  }
  
  // Notification operations
  async getNotifications(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter((notification) => notification.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async markNotificationsAsRead(ids: number[], userId: number): Promise<void> {
    for (const id of ids) {
      const notification = this.notifications.get(id);
      if (notification && notification.userId === userId) {
        notification.read = true;
        this.notifications.set(id, notification);
      }
    }
  }
  
  async markAllNotificationsAsRead(userId: number): Promise<void> {
    for (const [id, notification] of this.notifications.entries()) {
      if (notification.userId === userId) {
        notification.read = true;
        this.notifications.set(id, notification);
      }
    }
  }
}

export const storage = new MemStorage();
