import * as yup from "yup";

const createHistorySchema = yup.object().shape({
  hymnId: yup.string().required(),
  user: yup.string(),
  histId: yup.string(),
  isFavorite: yup.boolean(),
  playedAt: yup.date(),
});

const serializedCreateHistorySchema = yup.object().shape({
  hymnId: yup.string().required(),
  user: yup.string().required(),
  histId: yup.string().required(),
  isFavorite: yup.boolean().required(),
  playedAt: yup.date().required(),
});

export { createHistorySchema, serializedCreateHistorySchema };
