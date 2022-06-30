import { diskStorage, FileFilterCallback, Options } from "multer";
import { Request } from "express";
import { resolve } from "path";
import { randomBytes } from "crypto";
import { env } from "../environment-variables";
import { HttpException } from "../../handler-exceptions/http-exception.provider";
import { HttpStatus } from "../../utils/enums/http-status.enum";

const storageTypes: Record<string, any> = {
  local: diskStorage({
    destination: (
      _req: Request,
      _file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      cb(null, resolve(__dirname, "..", "..", "..", "uploads"));
    },
    filename: (
      _req,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void
    ) => {
      randomBytes(16, (err: Error | null, hash: Buffer) => {
        file.filename = `${hash.toString("hex")}-${file.originalname}`;
        if (err) cb(err, file.filename);
        cb(null, file.filename);
      });
    },
  }),
};

export const multerConfig: Options = {
  dest: resolve(__dirname, "..", "..", "..", "uploads"),
  storage: storageTypes[env.STORAGE_TYPE ?? "local"],
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (
    _request: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else
      cb(
        new HttpException(
          "Arquivo com formato inválido!",
          HttpStatus.BAD_REQUEST
        )
      );
  },
};
