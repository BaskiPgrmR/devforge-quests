import { Shield, Sword, HardHat, Footprints, Gem, Trophy, Zap, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Equipment {
  id: string;
  name: string;
  type: 'helmet' | 'sword' | 'armor' | 'boots' | 'trinket';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  stats: {
    intelligence: number;
    creativity: number;
    debugging: number;
  };
}

interface CharacterStats {
  level: number;
  xp: number;
  xpToNext: number;
  totalXp: number;
  questsCompleted: number;
  modulesCompleted: number;
  equipment: Equipment[];
  totalStats: {
    intelligence: number;
    creativity: number;
    debugging: number;
  };
}

const mockCharacterData: CharacterStats = {
  level: 12,
  xp: 2350,
  xpToNext: 3000,
  totalXp: 15750,
  questsCompleted: 47,
  modulesCompleted: 8,
  equipment: [
    {
      id: '1',
      name: 'Mystic Code Crown',
      type: 'helmet',
      rarity: 'epic',
      stats: { intelligence: 15, creativity: 10, debugging: 5 }
    },
    {
      id: '2',
      name: 'Syntax Slasher',
      type: 'sword',
      rarity: 'rare',
      stats: { intelligence: 8, creativity: 12, debugging: 15 }
    },
    {
      id: '3',
      name: 'Armor of Algorithms',
      type: 'armor',
      rarity: 'legendary',
      stats: { intelligence: 20, creativity: 15, debugging: 20 }
    }
  ],
  totalStats: {
    intelligence: 87,
    creativity: 64,
    debugging: 92
  }
};

const equipmentSlots = [
  { type: 'helmet' as const, icon: HardHat, position: 'top-center' },
  { type: 'sword' as const, icon: Sword, position: 'left' },
  { type: 'armor' as const, icon: Shield, position: 'center' },
  { type: 'boots' as const, icon: Footprints, position: 'bottom' },
  { type: 'trinket' as const, icon: Gem, position: 'right' }
];

const getRarityColor = (rarity: string) => {
  const colors = {
    common: 'text-common border-common',
    uncommon: 'text-uncommon border-uncommon',
    rare: 'text-rare border-rare',
    epic: 'text-epic border-epic',
    legendary: 'text-legendary border-legendary'
  };
  return colors[rarity as keyof typeof colors] || colors.common;
};

export const CharacterProfile = () => {
  const character = mockCharacterData;
  const xpProgress = (character.xp / character.xpToNext) * 100;

  return (
    <div className="space-y-6">
      {/* Character Overview */}
      <Card className="p-6 cosmic-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Code Warrior</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="level-badge">{character.level}</span>
              <span className="text-muted-foreground">Full-Stack Adventurer</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-accent">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">{character.questsCompleted} Quests</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {character.modulesCompleted} Modules Mastered
            </div>
          </div>
        </div>

        {/* XP Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground font-medium">Experience Points</span>
            <span className="text-accent font-bold">
              {character.xp.toLocaleString()} / {character.xpToNext.toLocaleString()} XP
            </span>
          </div>
          <div className="xp-bar h-3">
            <div 
              className="xp-fill h-full" 
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equipment Slots */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Equipment
          </h3>
          
          <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
            {equipmentSlots.map((slot) => {
              const equipment = character.equipment.find(eq => eq.type === slot.type);
              const SlotIcon = slot.icon;
              
              return (
                <div
                  key={slot.type}
                  className={`equipment-slot ${equipment ? 'filled' : ''} ${
                    equipment ? getRarityColor(equipment.rarity) : ''
                  }`}
                  title={equipment?.name || `Empty ${slot.type} slot`}
                >
                  <SlotIcon 
                    className={`w-6 h-6 ${equipment ? 'text-current' : 'text-muted-foreground/50'}`}
                  />
                </div>
              );
            })}
          </div>

          {/* Equipment List */}
          <div className="mt-6 space-y-2">
            <h4 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">
              Equipped Items
            </h4>
            {character.equipment.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                <div>
                  <div className={`font-medium ${getRarityColor(item.rarity).split(' ')[0]}`}>
                    {item.name}
                  </div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {item.rarity} {item.type}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">
                    +{item.stats.intelligence} INT
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Character Stats */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Character Stats
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="font-medium">Intelligence</span>
                </div>
                <span className="font-bold text-accent">{character.totalStats.intelligence}</span>
              </div>
              <Progress value={(character.totalStats.intelligence / 100) * 100} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-secondary" />
                  <span className="font-medium">Creativity</span>
                </div>
                <span className="font-bold text-accent">{character.totalStats.creativity}</span>
              </div>
              <Progress value={(character.totalStats.creativity / 100) * 100} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-success" />
                  <span className="font-medium">Debugging</span>
                </div>
                <span className="font-bold text-accent">{character.totalStats.debugging}</span>
              </div>
              <Progress value={(character.totalStats.debugging / 100) * 100} className="h-2" />
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="mt-6 pt-4 border-t border-border">
            <h4 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider mb-3">
              Recent Achievements
            </h4>
            <div className="space-y-2">
              <Badge className="bg-success/10 text-success border-success">
                🏆 CSS Master
              </Badge>
              <Badge className="bg-warning/10 text-warning border-warning">
                ⚡ JavaScript Ninja
              </Badge>
              <Badge className="bg-primary/10 text-primary border-primary">
                🛡️ React Defender
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};