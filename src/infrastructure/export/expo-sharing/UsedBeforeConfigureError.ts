export class UsedBeforeConfigureError extends Error {
  name = 'UsedBeforeConfigureError';

  message = 'Exporter was used before being configured!';
}
