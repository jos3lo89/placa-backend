import { z } from "zod";

export const registerScheme = z.object({
  nombre: z.string({ required_error: "El campo nombre es obligatorio." }),
  apellido: z.string({ required_error: "El campo apellido es obligatorio." }),
  email: z
    .string({ required_error: "El campo email es obligatorio." })
    .email("Por favor, introduce un email válido."),
  password: z
    .string({ required_error: "El campo contraseña es obligatorio." })
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
});

export const loginScheme = z.object({
  email: z
    .string({ required_error: "El campo email es obligatorio." })
    .email("Por favor, introduce un email válido."),
  password: z
    .string({ required_error: "El campo contraseña es obligatorio." })
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
});
