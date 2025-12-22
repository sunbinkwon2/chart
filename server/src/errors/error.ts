export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ChartGeneratingError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'ChartGeneratingError';
  }
}

export class ChartNotFoundError extends Error {
  constructor(chartId: string) {
    super(`Chart not found: ${chartId}`);
    this.name = 'ChartNotFoundError';
  }
}

export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
