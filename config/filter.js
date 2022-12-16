import { Types } from "mongoose";
import moment from "moment";
export const formatFilter = async (data) => {
  let queries = [];
  for await (let query of data) {
    switch (query["type"]) {
      case "TEXT":
        queries.push({ [query["column_id"]]: { $regex: `${query.value}`, $options: "i" } });
        break;

      case "ARRAY":
        queries.push({ [query["column_id"]]: { $in: query.value } });
        break;

      case "DATE":
        queries.push({
          [query["column_id"]]: {
            $gte: new Date(moment(new Date(query.value[0])).format("YYYY-MM-DD")),
            $lt: new Date(moment(new Date(query.value[1] ?? query.value[0])).add(1, "days").format("YYYY-MM-DD")),
          },
        });
        break;

      case "NUMBER":
        queries.push({ [query["column_id"]]: parseInt(query.value) });
        break;

      default:
        if (Types.ObjectId.isValid(query.value)) {
          queries.push({ [query["column_id"]]: Types.ObjectId(query.value) });
        } else {
          queries.push({ [query["column_id"]]: query.value });
        }
        break;
    }
  }
  return queries ?? [];
};
