import Case from "../models/case.model.js";

export const addWitness = async (req, res) => {
  const id = req.params.id;

  const { name, phone, age, gender, address } = req.body;

  try {
    const newWitness = {
      name,
      phone,
      age,
      gender,
      address,
      createdAt: new Date(),
    };

    const createWitness = await Case.findById(id);

    createWitness.witnesses.push(newWitness);

    await createWitness.save();

    return res.status(201).send({
      name,
      phone,
      age,
      gender,
      address,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Error happened ",
    });
  }
};
