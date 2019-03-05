/* global describe:true */
import TestCase from './testCase';

describe('talkRoom.Controller', () => {
    describe('save', () => TestCase.save());

    describe('addUser', () => TestCase.addUser());

    describe('listRead', () => TestCase.listRead());

    describe('read', () => TestCase.read());

    describe('remove', () => TestCase.remove());
});
