// Mock data storage - replace with actual database
let messages = [];
let nextId = 1;

export class Message {
  static async create(data) {
    const message = {
      id: `msg_${nextId++}`,
      conversation_id: data.conversation_id,
      content: data.content,
      role: data.role,
      timestamp: data.timestamp || new Date().toISOString(),
      created_date: new Date().toISOString()
    };
    
    messages.push(message);
    return message;
  }

  static async get(id) {
    return messages.find(msg => msg.id === id);
  }

  static async filter(criteria, sortBy = 'created_date', limit = 50) {
    let filtered = messages.filter(msg => {
      return Object.keys(criteria).every(key => msg[key] === criteria[key]);
    });
    
    // Sort by specified field
    filtered.sort((a, b) => {
      if (sortBy === 'created_date') {
        return new Date(b.created_date) - new Date(a.created_date);
      }
      return 0;
    });
    
    // Apply limit
    return filtered.slice(0, limit);
  }

  static async update(id, data) {
    const index = messages.findIndex(msg => msg.id === id);
    if (index !== -1) {
      messages[index] = { ...messages[index], ...data };
      return messages[index];
    }
    return null;
  }

  static async delete(id) {
    const index = messages.findIndex(msg => msg.id === id);
    if (index !== -1) {
      messages.splice(index, 1);
      return true;
    }
    return false;
  }
} 