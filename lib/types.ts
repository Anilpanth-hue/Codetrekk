export interface PlatformData {
    id: string
    name: string
    username: string
    totalSolved: number
    activeStreak: number
    maxStreak: number
    lastActive: string
    topics: {
      name: string
      count: number
      percentage: number
    }[]
    difficulties: {
      easy: number
      medium: number
      hard: number
    }
    recentProblems: {
      name: string
      difficulty: string
      topic: string
      solvedAt: string
    }[]
  }
  
  export interface UserProfile {
    email: string
    platforms: {
      id: string
      name: string
      username: string
      connected: boolean
    }[]
    stats: {
      totalQuestions: number
      totalActiveDays: number
      maxStreak: number
      currentStreak: number
      awards: number
      lastRefresh: string
    }
  }
  
  