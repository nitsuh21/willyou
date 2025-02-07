export interface Scene {
  id: string;
  name: string;
  type: 'proposal' | 'valentine' | 'anniversary';
  description: string;
  previewImage: string;
  modelPath: string;
  animations: string[];
}

export interface Character {
  id: string;
  name: string;
  gender: 'male' | 'female';
  style: 'anime' | 'casual' | 'formal';
  previewImage: string;
  modelPath: string;
  animations: {
    idle: string;
    propose: string;
    celebrate: string;
    [key: string]: string;
  };
}

export interface Invitation {
  id: string;
  type: 'proposal' | 'valentine' | 'anniversary';
  sender: Character;
  recipient: {
    name: string;
    email?: string;
  };
  message: string;
  scene: Scene;
  music?: string;
  createdAt: Date;
} 