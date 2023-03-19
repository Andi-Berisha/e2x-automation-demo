export class StorageState {
  private baseURL: string;
  private state: object;
  constructor(url: any) {
    this.baseURL = url;
    this.state = {
      cookies: [
        {
          sameSite: "Lax",
          name: "bc_consent",
          value: "%7B%22allow%22%3A%5B3%2C4%2C2%5D%2C%22deny%22%3A%5B%5D%7D",
          url: this.baseURL,
          expires: 1893488000,
        },

        {
          sameSite: "Lax",
          name: "tracking-preferences",
          value:
            "{%22version%22:1%2C%22destinations%22:{}%2C%22custom%22:{%22marketingAndAnalytics%22:true%2C%22advertising%22:true%2C%22functional%22:true}}",
          url: this.baseURL,
          expires: 1893488000,
        },
      ],
    };
  }

  public get getState(): any {
    return this.state;
  }
}
