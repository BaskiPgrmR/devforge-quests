import { CheckCircle, Circle, Crown, Zap, Target, ArrowRight, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface PathNode {
  id: string;
  title: string;
  description: string;
  type: 'module' | 'boss_battle';
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  progress: number;
  questsTotal: number;
  questsCompleted: number;
  xpReward: number;
  requiredLevel?: number;
  technologies: string[];
  unlocks?: string[];
}

const learningPath: PathNode[] = [
  {
    id: 'html_basics',
    title: 'HTML Foundations',
    description: 'Master the structure and semantics of web pages',
    type: 'module',
    status: 'completed',
    progress: 100,
    questsTotal: 8,
    questsCompleted: 8,
    xpReward: 500,
    technologies: ['HTML5', 'Semantic Tags', 'Accessibility'],
    unlocks: ['css_styling']
  },
  {
    id: 'css_styling',
    title: 'CSS Mastery',
    description: 'Style and layout your web applications beautifully',
    type: 'module',
    status: 'completed',
    progress: 100,
    questsTotal: 12,
    questsCompleted: 12,
    xpReward: 750,
    technologies: ['CSS3', 'Flexbox', 'Grid', 'Animations'],
    unlocks: ['frontend_boss']
  },
  {
    id: 'frontend_boss',
    title: 'Frontend Guardian',
    description: 'Prove your HTML & CSS mastery in epic battle!',
    type: 'boss_battle',
    status: 'completed',
    progress: 100,
    questsTotal: 1,
    questsCompleted: 1,
    xpReward: 1000,
    requiredLevel: 5,
    technologies: ['HTML', 'CSS', 'Responsive Design'],
    unlocks: ['javascript_core']
  },
  {
    id: 'javascript_core',
    title: 'JavaScript Fundamentals',
    description: 'Bring your websites to life with programming',
    type: 'module',
    status: 'in_progress',
    progress: 65,
    questsTotal: 15,
    questsCompleted: 10,
    xpReward: 1200,
    technologies: ['ES6+', 'DOM', 'Events', 'Async/Await'],
    unlocks: ['react_basics']
  },
  {
    id: 'react_basics',
    title: 'React Fundamentals',
    description: 'Build dynamic user interfaces with React',
    type: 'module',
    status: 'available',
    progress: 0,
    questsTotal: 10,
    questsCompleted: 0,
    xpReward: 1500,
    technologies: ['React', 'JSX', 'Hooks', 'State Management'],
    unlocks: ['frontend_master_boss']
  },
  {
    id: 'frontend_master_boss',
    title: 'Frontend Archmage',
    description: 'Face the ultimate frontend challenge!',
    type: 'boss_battle',
    status: 'locked',
    progress: 0,
    questsTotal: 1,
    questsCompleted: 0,
    xpReward: 2500,
    requiredLevel: 15,
    technologies: ['React', 'JavaScript', 'CSS', 'Performance'],
    unlocks: ['nodejs_backend']
  },
  {
    id: 'nodejs_backend',
    title: 'Backend with Node.js',
    description: 'Create powerful server-side applications',
    type: 'module',
    status: 'locked',
    progress: 0,
    questsTotal: 12,
    questsCompleted: 0,
    xpReward: 1800,
    technologies: ['Node.js', 'Express', 'REST APIs', 'Middleware'],
    unlocks: ['databases']
  },
  {
    id: 'databases',
    title: 'Database Mastery',
    description: 'Store and manage data efficiently',
    type: 'module',
    status: 'locked',
    progress: 0,
    questsTotal: 10,
    questsCompleted: 0,
    xpReward: 1600,
    technologies: ['SQL', 'MongoDB', 'Prisma', 'Relationships'],
    unlocks: ['fullstack_boss']
  },
  {
    id: 'fullstack_boss',
    title: 'Fullstack Sovereign',
    description: 'The ultimate test of full-stack mastery!',
    type: 'boss_battle',
    status: 'locked',
    progress: 0,
    questsTotal: 1,
    questsCompleted: 0,
    xpReward: 5000,
    requiredLevel: 30,
    technologies: ['React', 'Node.js', 'Databases', 'Deployment'],
    unlocks: []
  }
];

const getStatusIcon = (node: PathNode) => {
  if (node.status === 'completed') {
    return <CheckCircle className="w-6 h-6 text-success" />;
  }
  if (node.status === 'in_progress') {
    return <Zap className="w-6 h-6 text-primary animate-pulse" />;
  }
  if (node.status === 'available') {
    return <Target className="w-6 h-6 text-accent" />;
  }
  return <Circle className="w-6 h-6 text-muted-foreground" />;
};

const getNodeButton = (node: PathNode) => {
  if (node.status === 'completed') {
    return (
      <Button variant="outline" size="sm" className="bg-success/10 border-success text-success">
        <Star className="w-4 h-4 mr-2" />
        Mastered
      </Button>
    );
  }
  if (node.status === 'in_progress') {
    return (
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
        Continue Journey
      </Button>
    );
  }
  if (node.status === 'available') {
    return (
      <Button className="bg-accent text-accent-foreground hover:bg-accent/90" size="sm">
        Begin Quest
      </Button>
    );
  }
  return (
    <Button variant="ghost" size="sm" disabled className="text-muted-foreground">
      Locked
    </Button>
  );
};

export const LearningPath = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
          Full-Stack Learning Path
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Embark on an epic journey from web fundamentals to full-stack mastery. 
          Complete quests, defeat bosses, and level up your coding skills!
        </p>
      </div>

      <div className="relative">
        {/* Path Connection Line */}
        <div className="absolute left-8 top-16 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary opacity-30" />
        
        <div className="space-y-6">
          {learningPath.map((node, index) => (
            <div key={node.id} className="relative">
              {/* Connection Arrow */}
              {index > 0 && (
                <div className="absolute -top-3 left-8 transform -translate-x-1/2">
                  <ArrowRight className="w-4 h-4 text-primary rotate-90" />
                </div>
              )}
              
              <div className="flex items-start gap-6">
                {/* Status Icon */}
                <div className="relative z-10 p-2 rounded-full bg-card border-2 border-primary/20">
                  {node.type === 'boss_battle' && (
                    <Crown className="absolute -top-2 -right-2 w-4 h-4 text-accent" />
                  )}
                  {getStatusIcon(node)}
                </div>

                {/* Node Content */}
                <Card className={`flex-1 p-6 quest-card ${
                  node.type === 'boss_battle' 
                    ? 'cosmic-border bg-gradient-to-br from-card to-card-hover' 
                    : ''
                } ${node.status === 'locked' ? 'opacity-60' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="font-bold text-xl text-foreground flex items-center gap-2">
                          {node.title}
                          {node.type === 'boss_battle' && (
                            <Crown className="w-5 h-5 text-accent" />
                          )}
                        </h3>
                        <p className="text-muted-foreground mt-1">{node.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-accent font-bold mb-1">
                        <Star className="w-4 h-4" />
                        {node.xpReward.toLocaleString()} XP
                      </div>
                      {node.requiredLevel && (
                        <Badge variant="outline" className="text-xs">
                          Level {node.requiredLevel}+
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Progress (if in progress or completed) */}
                  {node.progress > 0 && (
                    <div className="mb-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Progress: {node.questsCompleted} / {node.questsTotal} quests
                        </span>
                        <span className="font-medium text-primary">{node.progress}%</span>
                      </div>
                      <Progress value={node.progress} className="h-2" />
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Technologies:</p>
                    <div className="flex flex-wrap gap-1">
                      {node.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs tech-icon">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {node.type === 'boss_battle' ? 'Epic Boss Battle' : `${node.questsTotal} Quests`}
                    </div>
                    {getNodeButton(node)}
                  </div>

                  {/* Unlocks Preview */}
                  {node.unlocks && node.unlocks.length > 0 && node.status !== 'locked' && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-1">Unlocks:</p>
                      <div className="flex gap-1 flex-wrap">
                        {node.unlocks.map((unlockId) => {
                          const unlocked = learningPath.find(n => n.id === unlockId);
                          return unlocked ? (
                            <Badge key={unlockId} variant="outline" className="text-xs">
                              {unlocked.title}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};