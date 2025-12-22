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
  constructor(id: string) {
    super(`Chart not found: ${id}`);
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
