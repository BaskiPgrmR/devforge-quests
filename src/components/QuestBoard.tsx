import { Play, CheckCircle, Lock, Star, Zap, Target, Clock, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Quest {
  id: string;
  title: string;
  description: string;
  module: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  xpReward: number;
  estimatedTime: string;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  progress?: number;
  prerequisites?: string[];
  technologies: string[];
}

const mockQuests: Quest[] = [
  {
    id: '1',
    title: 'HTML Foundations',
    description: 'Master the building blocks of the web with semantic HTML elements and structure.',
    module: 'Frontend Basics',
    difficulty: 'beginner',
    xpReward: 100,
    estimatedTime: '30 min',
    status: 'completed',
    technologies: ['HTML', 'Semantic Tags']
  },
  {
    id: '2',
    title: 'CSS Styling Mastery',
    description: 'Learn to style your HTML with CSS, including flexbox and grid layouts.',
    module: 'Frontend Basics',
    difficulty: 'beginner',
    xpReward: 150,
    estimatedTime: '45 min',
    status: 'completed',
    technologies: ['CSS', 'Flexbox', 'Grid']
  },
  {
    id: '3',
    title: 'JavaScript Fundamentals',
    description: 'Dive into programming logic, variables, functions, and DOM manipulation.',
    module: 'Frontend Basics',
    difficulty: 'intermediate',
    xpReward: 200,
    estimatedTime: '60 min',
    status: 'in_progress',
    progress: 65,
    technologies: ['JavaScript', 'DOM', 'ES6']
  },
  {
    id: '4',
    title: 'React Component Architecture',
    description: 'Build dynamic user interfaces with React components and hooks.',
    module: 'Frontend Frameworks',
    difficulty: 'intermediate',
    xpReward: 250,
    estimatedTime: '90 min',
    status: 'available',
    prerequisites: ['JavaScript Fundamentals'],
    technologies: ['React', 'JSX', 'Hooks']
  },
  {
    id: '5',
    title: 'State Management with Redux',
    description: 'Master complex application state with Redux and middleware.',
    module: 'Frontend Frameworks',
    difficulty: 'advanced',
    xpReward: 300,
    estimatedTime: '120 min',
    status: 'locked',
    prerequisites: ['React Component Architecture'],
    technologies: ['Redux', 'Middleware', 'Actions']
  },
  {
    id: '6',
    title: 'Node.js Backend Setup',
    description: 'Create your first server with Node.js and Express framework.',
    module: 'Backend Development',
    difficulty: 'intermediate',
    xpReward: 200,
    estimatedTime: '75 min',
    status: 'available',
    technologies: ['Node.js', 'Express', 'REST API']
  }
];

const getDifficultyColor = (difficulty: string) => {
  const colors = {
    beginner: 'text-success border-success bg-success/10',
    intermediate: 'text-warning border-warning bg-warning/10',
    advanced: 'text-destructive border-destructive bg-destructive/10',
    expert: 'text-legendary border-legendary bg-legendary/10'
  };
  return colors[difficulty as keyof typeof colors] || colors.beginner;
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-5 h-5 text-success" />;
    case 'in_progress':
      return <Play className="w-5 h-5 text-primary" />;
    case 'locked':
      return <Lock className="w-5 h-5 text-muted-foreground" />;
    default:
      return <Target className="w-5 h-5 text-accent" />;
  }
};

const getStatusButton = (quest: Quest) => {
  switch (quest.status) {
    case 'completed':
      return (
        <Button variant="outline" size="sm" disabled className="bg-success/10 border-success text-success">
          <Trophy className="w-4 h-4 mr-2" />
          Completed
        </Button>
      );
    case 'in_progress':
      return (
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
          <Play className="w-4 h-4 mr-2" />
          Continue
        </Button>
      );
    case 'locked':
      return (
        <Button variant="ghost" size="sm" disabled className="text-muted-foreground">
          <Lock className="w-4 h-4 mr-2" />
          Locked
        </Button>
      );
    default:
      return (
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90" size="sm">
          <Target className="w-4 h-4 mr-2" />
          Start Quest
        </Button>
      );
  }
};

export const QuestBoard = () => {
  const groupedQuests = mockQuests.reduce((acc, quest) => {
    if (!acc[quest.module]) {
      acc[quest.module] = [];
    }
    acc[quest.module].push(quest);
    return acc;
  }, {} as Record<string, Quest[]>);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
          Quest Board
        </h1>
        <p className="text-muted-foreground text-lg">
          Choose your adventure and master the full-stack journey
        </p>
      </div>

      {Object.entries(groupedQuests).map(([module, quests]) => (
        <div key={module} className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-foreground">{module}</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-primary to-transparent" />
            <Badge variant="outline" className="text-sm">
              {quests.filter(q => q.status === 'completed').length} / {quests.length} Complete
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quests.map((quest) => (
              <Card 
                key={quest.id} 
                className={`quest-card p-6 ${quest.status === 'locked' ? 'opacity-60' : ''}`}
              >
                <div className="space-y-4">
                  {/* Quest Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(quest.status)}
                      <Badge className={getDifficultyColor(quest.difficulty)}>
                        {quest.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-accent font-bold">
                      <Star className="w-4 h-4" />
                      {quest.xpReward} XP
                    </div>
                  </div>

                  {/* Quest Content */}
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">{quest.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {quest.description}
                    </p>
                  </div>

                  {/* Progress Bar (if in progress) */}
                  {quest.status === 'in_progress' && quest.progress && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-primary">{quest.progress}%</span>
                      </div>
                      <Progress value={quest.progress} className="h-2" />
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1">
                    {quest.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs tech-icon">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Quest Footer */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Clock className="w-4 h-4" />
                      {quest.estimatedTime}
                    </div>
                    {getStatusButton(quest)}
                  </div>

                  {/* Prerequisites (if any) */}
                  {quest.prerequisites && quest.prerequisites.length > 0 && (
                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-1">Prerequisites:</p>
                      <div className="flex flex-wrap gap-1">
                        {quest.prerequisites.map((prereq) => (
                          <Badge key={prereq} variant="outline" className="text-xs">
                            {prereq}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};