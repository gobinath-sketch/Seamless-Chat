// Mock data storage - replace with actual database
let conversations = [];
let nextId = 1;

export class Conversation {
  static async create(data) {
    const conversation = {
      id: `conv_${nextId++}`,
      title: data.title,
      last_message: data.last_message || "",
      message_count: data.message_count || 0,
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    };
    
    conversations.push(conversation);
    return conversation;
  }

  static async get(id) {
    return conversations.find(conv => conv.id === id);
  }

  static async list() {
    return conversations.sort((a, b) => new Date(b.updated_date) - new Date(a.updated_date));
  }

  static async update(id, data) {
    const index = conversations.findIndex(conv => conv.id === id);
    if (index !== -1) {
      conversations[index] = { ...conversations[index], ...data, updated_date: new Date().toISOString() };
      return conversations[index];
    }
    return null;
  }

  static async delete(id) {
    const index = conversations.findIndex(conv => conv.id === id);
    if (index !== -1) {
      conversations.splice(index, 1);
      return true;
    }
    return false;
  }
} 