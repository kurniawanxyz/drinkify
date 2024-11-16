import { WaterIntake } from "./WaterIntake"

export type DailyGoal = {
    id: number,
    user_id: number,
    goal_amount: number,
    water_intakes: WaterIntake[]
    total_water_intake: number,
    remaining_water : number,
    created_at: Date,
    updated_at: Date
}