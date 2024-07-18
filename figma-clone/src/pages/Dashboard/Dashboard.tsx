import { useState } from "react";
import SideNavBar from "../../components/layout/dashboard/SideNavBar";
import Content from "../../components/layout/dashboard/Content";


export default function Dashboard() {
  const [showRecentContent, setShowRecentContent] = useState(true);
  const [showDraftConten, setShowDraftContent] = useState(false);
  const [recActive, setRecActive] = useState(true);
  const [draftActive, setDraftActive] = useState(false);
  showDraftConten
  const handleRecentClick = () => {
    setShowRecentContent(true);
    setShowDraftContent(false);
    setRecActive(true);
    setDraftActive(false);
  };

  const handleDraftClick = () => {
    setShowRecentContent(false);
    setShowDraftContent(true);
    setRecActive(false);
    setDraftActive(true);
  };

  return (
    <div className="bg-backgroundDash h-screen w-screen flex">
      <SideNavBar
        onRecentClick={handleRecentClick}
        onDraftClick={handleDraftClick}
        recActive={recActive}
        draftActive={draftActive}
      />

      <div className="w-screen">
        <Content recentOrDraft={showRecentContent ? 'recent' : 'draft'} />
      </div>
    </div>
  );
}






