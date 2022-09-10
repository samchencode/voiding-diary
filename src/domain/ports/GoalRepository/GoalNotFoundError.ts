class GoalNotFoundError extends Error {
  name = 'GoalNotFoundError';

  message = 'Goal could not be found';
}

export { GoalNotFoundError };
