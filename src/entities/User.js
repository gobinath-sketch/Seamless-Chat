// Mock user data - replace with actual authentication
export class User {
  static async me() {
    // Mock user data
    return {
      id: 'user_1',
      name: 'Demo User',
      email: 'demo@example.com',
      avatar: null,
      created_date: new Date().toISOString()
    };
  }

  static async update(data) {
    // Mock update - in real app, this would update the user profile
    return {
      id: 'user_1',
      name: data.name || 'Demo User',
      email: data.email || 'demo@example.com',
      avatar: data.avatar || null,
      updated_date: new Date().toISOString()
    };
  }
} 