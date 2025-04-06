import { describe, expect, test } from "vitest";
import { checkDir, checkFile, addFunko } from '../src/addCommand.js';
import { gender, funkoType } from "../src/funkoPop.js";
import { FunkoPop } from "../src/funkoPop.js";
import path from 'path';
import fs from 'fs';

const funkoData: FunkoPop = {
  id: 1,
  nombre: "Sonic",
  descripcion: "Sonic_the_hedgehog",
  tipo: funkoType.POP,
  genero: gender.ANIMACION,
  franquicia: "Sonic",
  numero: 1,
  esExclusivo: false,
  caracteristicasEspeciales: "_",
  valorMercado: 10,
};
const user = "testUser";

describe("Asynchronous function CheckDir", () => {
  test("The path is calculated correctly", () =>
    new Promise<void>((done) => {
      checkDir(user, funkoData, (error, funko, usuario, filePath) => {
        if (!error) {
          expect(funko).toEqual(funkoData);
          expect(usuario).toEqual(user);
          expect(filePath).toEqual(path.join(process.cwd(), "testUser/testUser.json"));
          done();
        }
      });
    }));
});


describe("Asynchronous function CheckFile", () => {
  test("addFunko should add a Funko with the given values", () =>
    new Promise<void>((done) => {
      checkDir(user, funkoData, (error, funko, usuario, filePath) => {
        if (!error) {
          checkFile(funko as FunkoPop, usuario as string, filePath as string, (error, funko, usuario) => {
            if (!error) {
              expect(funko).toEqual(funkoData);
              expect(usuario).toEqual(user);
              done();
            }
          });
        }
      });
    }));
});


describe("Asyncrhonus function addFunko", () => {
  test('addFunko should add a Funko with the given values', () => {
    new Promise<void>((done) => {
      addFunko(funkoData, user);
      fs.readFile(path.join(process.cwd(), `/${user}/${user}.json`), (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const funkos = JSON.parse(data.toString()) as FunkoPop[];
        console.log(funkos);
        expect(funkos[0]).toEqual(funkoData);
        done();
      });
    })
  })
})


