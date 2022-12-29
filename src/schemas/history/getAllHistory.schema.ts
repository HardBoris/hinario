import * as yup from "yup";

const getAllHistorySchema = yup.array().of(
  yup.object().shape({
    hymnId: yup.string().required(),
    user: yup.string().uuid().required(),
    histId: yup.string().required(),
    isFavorite: yup.boolean().required(),
    playedAt: yup.date().required(),
  })
);

export { getAllHistorySchema };
