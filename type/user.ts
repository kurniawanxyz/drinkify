import { DailyGoal } from "./DailyGoal"
import { Reminder } from "./Reminder"
import { WaterIntake } from "./WaterIntake"

export type User = {
    id: string,
    name: string,
    email: string,
    daily_goals: DailyGoal[],
    goals_today: DailyGoal | null,
    reminders: Reminder[],
    goals_success: number,
    goals_failed: number,
    average_water_intakes: number,
}