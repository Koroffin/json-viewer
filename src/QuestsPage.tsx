import { questsStore } from "./state";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { observer } from "mobx-react-lite";
import { QuestForm } from "./QuestForm";

export const QuestsPage = observer(() => {
  const { quests, selectedQuest } = questsStore;
  const selectQuest = (quest: Quest) => {
    questsStore.setSelectedQuest(quest);
  };

  if (selectedQuest) {
    return <QuestForm quest={selectedQuest} />;
  }

  return (
    <List component="nav">
      {quests.map((quest) => (
        <ListItemButton key={quest.id} onClick={() => selectQuest(quest)}>
          <ListItemText primary={quest.name} />
        </ListItemButton>
      ))}
    </List>
  );
});
