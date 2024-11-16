import { DailyGoal } from "./DailyGoal"
import { Reminder } from "./Reminder"
import { WaterIntake } from "./WaterIntake"

export type User = {
    id: string,
    name: string,
    email: string,
    water_intakes: WaterIntake[],
    daily_goals: DailyGoal[],
    goals_today: DailyGoal | null,
    reminders: Reminder[]
}