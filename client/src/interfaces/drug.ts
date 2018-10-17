export class Drug {
  public id: string;
  public name: string;
  public description: string;
  public infusable: string;
  public constructor(
    id: string,
    name: string,
    description: string,
    infusable: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.infusable = infusable;
  }

  public toString = (): string => {
    return `Drug (id: ${this.id} , id: ${this.name} ,id: ${
      this.description
    } ,id: ${this.infusable}  )`;
  };
}
