import { makeObservable, observable, action, autorun } from "mobx";

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

export const questsStore = new QuestsStore();

autorun(() => {
  // save to local storage
  console.log("Saving to local storage");
  localStorage.setItem("quests", JSON.stringify(questsStore.quests));
});
