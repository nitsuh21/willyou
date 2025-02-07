import { useState } from 'react';
import { motion } from 'framer-motion';
import CharacterSelector from '../components/CharacterSelector';
import SceneSelector from '../components/SceneSelector';
import Scene3D from '../components/Scene3D';
import RecipientForm from '../components/RecipientForm';
import MessageForm from '../components/MessageForm';
import { Character, Scene, Invitation } from '../types';

export default function CustomizePage() {
  const [step, setStep] = useState(1);
  const [invitation, setInvitation] = useState<Partial<Invitation>>({
    type: 'proposal',
  });

  const handleCharacterSelect = (character: Character) => {
    setInvitation((prev) => ({ ...prev, sender: character }));
    setStep(2);
  };

  const handleSceneSelect = (scene: Scene) => {
    setInvitation((prev) => ({ ...prev, scene }));
    setStep(3);
  };

  const handleRecipientDetails = (data: { name: string; email?: string }) => {
    setInvitation((prev) => ({
      ...prev,
      recipient: data,
    }));
    setStep(4);
  };

  const handleMessage = (message: string) => {
    setInvitation((prev) => ({
      ...prev,
      message,
      createdAt: new Date(),
    }));
    // Generate unique invitation link and save to database
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          {/* Add progress indicator */}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {step === 1 && (
              <CharacterSelector onSelect={handleCharacterSelect} />
            )}
            {step === 2 && (
              <SceneSelector onSelect={handleSceneSelect} />
            )}
            {step === 3 && (
              <RecipientForm onSubmit={handleRecipientDetails} />
            )}
            {step === 4 && (
              <MessageForm onSubmit={handleMessage} />
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Preview</h3>
            {invitation.sender && invitation.scene && (
              <Scene3D
                scene={invitation.scene}
                character={invitation.sender}
                animation={step === 4 ? 'propose' : 'idle'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 