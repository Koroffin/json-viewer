import { makeObservable, observable, action, autorun, computed } from "mobx";

class QuestsStore {
  quests: Quest[] = [];
  selectedQuest: Quest | null = null;
  constructor() {
    makeObservable(this, {
      quests: observable,
      selectedQuest: observable,
      setData: action,
      setSelectedQuest: action,
      updateQuest: action,
    });
    this.restoreData();
  }
  restoreData() {
    const quests = localStorage.getItem("quests");
    if (quests) {
      this.quests = JSON.parse(quests);
    }
  }
  setData(quests: Quest[]) {
    this.quests = quests;
  }
  setSelectedQuest(quest: Quest) {
    this.selectedQuest = quest;
  }
  updateQuest(quest: Quest) {
    const index = this.quests.findIndex((q) => q.id === quest.id);
    this.quests[index] = quest;
    this.selectedQuest = null;
  }
}

class DialogStore {
  nodes: DialogNode[] = [];
  editingNode: DialogNode | null = null;
  constructor() {
    makeObservable(this, {
      nodes: observable,
      canvasWidth: computed,
      canvasHeight: computed,
      options: computed,
      editingNode: observable,
      setData: action,
      updateNodeCoords: action,
      updateNodeText: action,
      updateNodeNext: action,
      addNode: action,
      addNodeNext: action,
      deleteNodeNext: action,
      deleteNode: action,
      setEditingNode: action,
    });
  }
  get options() {
    return this.nodes.map((node) => ({
      value: node.id,
      label: node.text,
    }));
  }
  get canvasWidth() {
    return Math.max(Math.max(...this.nodes.map((node) => node.left + this.calculateNodeWidth(node.id))) + 300, window.innerWidth);
  }
  get canvasHeight() {
    return Math.max(Math.max(...this.nodes.map((node) => node.top + this.calculateNodeHeight(node.id))) + 300, window.innerHeight);
  }
  get lexicon() {
    const lexicon: { id: string; value: string }[] = [];
    let optionsCounter = 0;
    this.nodes.forEach((node) => {
      lexicon.push({ id: `dialogue.${node.id}`, value: node.text });
      node.next.forEach((next) => {
        lexicon.push({ id: `option.${++optionsCounter}`, value: next.value });
      });
    });
    return { data: lexicon };
  }
  get json() {
    const data: { id: string; links: { to: string; value: string }[] }[] = [];
    let optionsCounter = 0;

    this.nodes.forEach((node) => {
      const links: { to: string; value: string }[] = [];
      node.next.forEach((next) => {
        links.push({ value: `option.${++optionsCounter}`, to: `dialogue.${next.to}` });
      });
      data.push({ id: `dialogue.${node.id}`, links });
    });

    return { data };
  }
  setData(nodes: DialogNode[]) {
    this.nodes = nodes;
  }
  updateNodeCoords(id: number, coords: Pick<DialogNode, "top" | "left">) {
    const { top, left } = coords;
    const node = this.getNode(id);
    if (!node) return;
    node.top = top;
    node.left = left;
  }
  updateNodeText(id: number, text: DialogNode["text"]) {
    const node = this.getNode(id);
    if (!node) return;
    node.text = text;
  }
  updateNodeNext(id: number, next: DialogNode["next"]) {
    const node = this.getNode(id);
    if (!node) return;
    node.next = next;
  }
  addNodeNext(id: number) {
    const node = this.getNode(id);
    if (!node) return;
    node.next = [...node.next, { to: 0, value: "" }];
  }
  deleteNodeNext(id: number, index: number) {
    const node = this.getNode(id);
    if (!node) return;
    node.next = node.next.filter((_, i) => i !== index);
  }
  getNode(id: number) {
    return this.nodes.find((node) => node.id === id);
  }
  calculateNodeWidth(id: number) {
    const node = this.getNode(id);
    if (!node) return 0;
    const text = node.text;
    const lines = text.split("\n");
    const padding = 10;
    const width =
      Math.max(...lines.map((line) => line.length)) * 8 + padding * 2;
    return width;
  }
  calculateNodeHeight(id: number) {
    const node = this.getNode(id);
    if (!node) return 0;
    const text = node.text;
    const lines = text.split("\n");
    const lineHeight = 16;
    const padding = 10;
    const height = lines.length * lineHeight + padding * 2;
    return height;
  }
  calculateNodeMiddle(id: number) {
    // consider that padding is 10px and font size is 16px Times New Roman
    const node = this.getNode(id);
    if (!node) return;

    const height = this.calculateNodeHeight(id);
    const width = this.calculateNodeWidth(id);

    const top = node.top + height / 2;
    const left = node.left + width / 2;

    return { top, left };
  }
  addNode(text: string) {
    const id = new Date().getTime();
    // find some spot, do not occupoed by other nodes
    let top = 100;
    let left = 100;
    let found = false;
    while (!found) {
      const node = this.nodes.find((node) => node.top === top);
      if (!node) {
        found = true;
      } else {
        top += 100;
      }
    }
    const coords = { top, left };

    const node = { id, text, ...coords, next: [] };
    this.nodes.push(node);
  }
  deleteNode(id: number) {
    const index = this.nodes.findIndex((node) => node.id === id);
    this.nodes = this.nodes.filter((_, i) => i !== index);
    // clean up links to non-existing nodes
    this.nodes.forEach((node) => {
      node.next = node.next.filter((next) => this.getNode(next.to));
    });
  }
  setEditingNode(node: DialogNode | null) {
    this.editingNode = node;
  }
}

export const questsStore = new QuestsStore();
export const dialogStore = new DialogStore();

dialogStore.setData([
  {
    id: 1,
    text: "Hello",
    top: 100,
    left: 100,
    next: [{ to: 2, value: "Link" }],
  },
  {
    id: 2,
    text: "World",
    top: 100,
    left: 300,
    next: [],
  },
]);

autorun(() => {
  // save to local storage
  console.log("Saving to local storage");
  localStorage.setItem("quests", JSON.stringify(questsStore.quests));
});
