"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExplorerFile,
  PanelId,
  Tab,
  fileForProject,
  fileToTab,
  rootFiles,
} from "@/lib/files";
import { Commit, buildTimeline, commitColorClass, findCommit } from "@/lib/experience";
import ActivityBar, { ViewId } from "./ActivityBar";
import TitleBar from "./TitleBar";
import Sidebar from "./Sidebar";
import TabBar from "./TabBar";
import StatusBar from "./StatusBar";
import BootScreen from "./BootScreen";
import CodeBackground from "./CodeBackground";
import ReadmePanel from "../panels/ReadmePanel";
import StackPanel from "../panels/StackPanel";
import ProjectPanel from "../panels/ProjectPanel";
import ProjectsIndexPanel from "../panels/ProjectsIndexPanel";
import ContactPanel from "../panels/ContactPanel";
import CommitDiffPanel from "../panels/CommitDiffPanel";

const readmeTab = fileToTab(rootFiles.find((f) => f.id === "readme")!);

const panelKeyFor = (tab: Tab): string =>
  tab.kind === "commit"
    ? tab.id
    : tab.panel === "project"
    ? `project-${tab.projectSlug}`
    : tab.panel ?? tab.id;

const commitToTab = (c: Commit): Tab => ({
  id: `commit-${c.id}`,
  name: c.fileName,
  ext: "DIFF",
  color: commitColorClass[c.type],
  lang: "Diff",
  kind: "commit",
  commitId: c.id,
});

const EditorShell = () => {
  const [booted, setBooted] = useState(false);
  const [activeView, setActiveView] = useState<ViewId>("explorer");
  const [openTabs, setOpenTabs] = useState<Tab[]>([readmeTab]);
  const [activeTabId, setActiveTabId] = useState<string>(readmeTab.id);
  const [mobileOpen, setMobileOpen] = useState(false);

  const commits = useMemo(() => buildTimeline(), []);
  const activeTab = openTabs.find((t) => t.id === activeTabId);

  // a doc's vim-typing animation should only ever play once per session —
  // mark it seen as soon as it's opened (not when typing finishes), so
  // switching away mid-type and coming back doesn't replay it either
  const seenDocs = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (activeTab) seenDocs.current.add(panelKeyFor(activeTab));
  }, [activeTab]);

  const addTab = useCallback((tab: Tab) => {
    setOpenTabs((tabs) => (tabs.some((t) => t.id === tab.id) ? tabs : [...tabs, tab]));
    setActiveTabId(tab.id);
    setMobileOpen(false);
  }, []);

  const openFile = (file: ExplorerFile) => {
    if (file.external) {
      if (file.download) {
        const a = document.createElement("a");
        a.href = file.external;
        a.download = "MateuszLaskowskiResume.pdf";
        a.click();
      } else {
        window.open(file.external, "_blank", "noopener,noreferrer");
      }
      return;
    }
    addTab(fileToTab(file));
  };

  const openProjectBySlug = (slug: string) => {
    const file = fileForProject(slug);
    if (file) addTab(fileToTab(file));
  };

  const openCommit = (commit: Commit) => addTab(commitToTab(commit));

  // deep-link (#project-slug)
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) openProjectBySlug(hash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeTab?.kind === "file" && activeTab.projectSlug) {
      window.history.replaceState(null, "", `#${activeTab.projectSlug}`);
    }
  }, [activeTab]);

  const selectView = (v: ViewId) => {
    setActiveView(v);
    setMobileOpen(true);
  };

  const openScm = () => {
    setActiveView("scm");
    setMobileOpen(false);
  };

  const closeTab = (id: string) => {
    setOpenTabs((tabs) => {
      const idx = tabs.findIndex((t) => t.id === id);
      const next = tabs.filter((t) => t.id !== id);
      if (id === activeTabId && next.length) {
        setActiveTabId(next[Math.max(0, idx - 1)].id);
      }
      return next;
    });
  };

  const goToPanel = (panel: PanelId) => {
    const file = rootFiles.find((f) => f.panel === panel && !f.external);
    if (file) addTab(fileToTab(file));
  };

  const renderEditor = () => {
    if (!activeTab) return null;
    const instant = seenDocs.current.has(panelKeyFor(activeTab));

    if (activeTab.kind === "commit") {
      return (
        <CommitDiffPanel commit={findCommit(activeTab.commitId!)} instant={instant} />
      );
    }
    switch (activeTab.panel) {
      case "readme":
        return (
          <ReadmePanel onGoPanel={goToPanel} onOpenScm={openScm} instant={instant} />
        );
      case "stack":
        return (
          <StackPanel
            onOpenProject={openProjectBySlug}
            onOpenScm={openScm}
            instant={instant}
          />
        );
      case "projects-index":
        return <ProjectsIndexPanel onOpenProject={openProjectBySlug} instant={instant} />;
      case "project":
        return <ProjectPanel slug={activeTab.projectSlug} instant={instant} />;
      case "contact":
        return <ContactPanel instant={instant} />;
      default:
        return null;
    }
  };

  const panelKey = activeTab ? panelKeyFor(activeTab) : undefined;

  return (
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-ed-bg text-ed-fg">
      <AnimatePresence>
        {!booted && <BootScreen onDone={() => setBooted(true)} />}
      </AnimatePresence>

      <TitleBar activeFile={activeTab} onMenuClick={() => setMobileOpen((o) => !o)} />

      <div className="flex min-h-0 flex-1">
        {/* editor area (left) */}
        <div className="flex min-w-0 flex-1 flex-col">
          <TabBar
            tabs={openTabs}
            activeTabId={activeTabId}
            onSelect={setActiveTabId}
            onClose={closeTab}
          />
          <div className="relative min-h-0 flex-1">
            <CodeBackground />
            <div className="absolute inset-0 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={panelKey}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {renderEditor()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* sidebar (right) */}
        <Sidebar
          view={activeView}
          openTabIds={openTabs.map((t) => t.id)}
          activeTabId={activeTabId}
          onOpen={openFile}
          commits={commits}
          onOpenCommit={openCommit}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        {/* activity bar (far right) */}
        <ActivityBar active={activeView} onSelect={selectView} />
      </div>

      <StatusBar activeFile={activeTab} />
    </div>
  );
};

export default EditorShell;
