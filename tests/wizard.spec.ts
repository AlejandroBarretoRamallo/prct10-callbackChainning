import { describe, test, expect } from "vitest";
import {findSpell} from '../src/wizardAPI'


describe("Asynchronous function findSpell", () => {
  const Spell = {
    "id": "fbd3cb46-c174-4843-a07e-fd83545dce58",
    "name": "Opening Charm",
    "incantation": "Aberto",
    "effect": "Opens doors",
    "canBeVerbal": true,
    "type": "Charm",
    "light": "Blue",
    "creator": null
  }
  test("findSpell with any name, type and incantation should return 306 Spells", () => {
    return findSpell()
    .then((Spells) => {
      expect(Spells.length).toEqual(306)
    })
  });
  test("findSpell(Openning Charm) should return the predefined Spell", () => {
    return findSpell('Opening Charm')
    .then((spell) => {
      expect(spell[0]).toEqual(Spell)
    })
  })
  test("findSpell(Undefined, Charm) should return ", () => {
    return findSpell(undefined, 'Charm')
    .then((spell) => {
      expect(spell.length).toEqual(160)
    })
  })
  test("findSpell(undefined, undefined, Aberto) should return the predefined Spell", () => {
    return findSpell(undefined, undefined, 'Aberto')
    .then((spell) => {
      expect(spell[0]).toEqual(Spell)
    })
  })
  test("Specifying a bad type should return an error", () => {
    return findSpell(undefined, 'chharm')
    .catch((err) => {
      expect(err.values.includes("errors"))
    })
  })
  test("Specifying a bad name should return an error", () => {
    return findSpell('Openingggg Charm')
    .catch((err) => {
      expect(err).toEqual('Spell not found')
    })
  })
})