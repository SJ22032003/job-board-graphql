import { connection } from "./connection.js";
import DataLoader from "dataloader";
const getCompanyTable = () => connection.table("company");

export async function getCompany(id) {
  return await getCompanyTable().first().where({ id });
}

export const companyLoader = new DataLoader(
  async (ids) => {
    const companies = await getCompanyTable().whereIn("id", [...new Set(ids)]);
    const companyMap = new Map();
    companies.forEach((company) => companyMap.set(company.id, company));
    return ids.map((id) => companyMap.get(id));
  },
  { cache: false }
);
