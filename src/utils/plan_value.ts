export const calculatePlanValue = async (basePlanValue, age) => {
  if (age >= 0 && age <= 18) {
    return basePlanValue * 0.5;
  } else if (age >= 19 && age <= 23) {
    return basePlanValue * 1.0;
  } else if (age >= 24 && age <= 28) {
    return basePlanValue * 1.5;
  } else if (age >= 29 && age <= 33) {
    return basePlanValue * 2.0;
  } else if (age >= 34 && age <= 38) {
    return basePlanValue * 2.5;
  } else if (age >= 39 && age <= 43) {
    return basePlanValue * 3.0;
  } else if (age >= 44 && age <= 48) {
    return basePlanValue * 3.5;
  } else if (age >= 49 && age <= 53) {
    return basePlanValue * 4.0;
  } else if (age >= 54) {
    return basePlanValue * 4.5;
  }
};
