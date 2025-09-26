import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LearningPath } from "./LearningPath";
import { QuestBoard } from "./QuestBoard";
import { CharacterProfile } from "./CharacterProfile";
import { MapPin, Sword, User, Trophy, Target, Star, Zap, Crown } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("path");

  // Mock user stats
  const userStats = {
    level: 12,
    xp: 2350,
    xpToNext: 3000,
    streak: 7,
    totalQuests: 47,
    weeklyXp: 1250
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70" />
        
        <div className="relative px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
                QuestCode Academy
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Master full-stack development through epic quests and RPG-style progression
              </p>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Card className="p-4 text-center cosmic-border">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-accent" />
                  <span className="font-bold text-2xl text-foreground">{userStats.level}</span>
                </div>
                <p className="text-sm text-muted-foreground">Current Level</p>
              </Card>

              <Card className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-primary" />
                  <span className="font-bold text-2xl text-foreground">{userStats.xp.toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted-foreground">Total XP</p>
              </Card>

              <Card className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-warning" />
                  <span className="font-bold text-2xl text-foreground">{userStats.streak}</span>
                </div>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </Card>

              <Card className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-success" />
                  <span className="font-bold text-2xl text-foreground">{userStats.totalQuests}</span>
                </div>
                <p className="text-sm text-muted-foreground">Quests Complete</p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-card border">
              <TabsTrigger 
                value="path" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <MapPin className="w-4 h-4" />
                Learning Path
              </TabsTrigger>
              <TabsTrigger 
                value="quests"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Target className="w-4 h-4" />
                Quests
              </TabsTrigger>
              <TabsTrigger 
                value="character"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <User className="w-4 h-4" />
                Character
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="path" className="mt-8">
            <LearningPath />
          </TabsContent>

          <TabsContent value="quests" className="mt-8">
            <QuestBoard />
          </TabsContent>

          <TabsContent value="character" className="mt-8">
            <div className="max-w-4xl mx-auto">
              <CharacterProfile />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Weekly Progress Footer */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-1">This Week's Progress</h3>
              <p className="text-sm text-muted-foreground">
                You've earned {userStats.weeklyXp} XP this week! Keep up the great work!
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                View Achievements
              </Button>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90" size="sm">
                Continue Learning
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};