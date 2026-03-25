
test("returns push workout plan when type is push", () => {
    const result = getWorkoutPlans("push");
    expect(result).toEqual([
        "Bench Press - 4 sets x 8 reps",
        "Incline Dumbbell Press - 3 sets x 10 reps",
        "Shoulder Press - 3 sets x 10 reps",
        "Tricep Dips - 3 sets x 12 reps"
    ]);
});