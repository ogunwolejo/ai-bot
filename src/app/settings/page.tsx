"use client";

import MainLayout from "@/app/components/ui/organism/main.layout";
import {PromptSetting} from "@/app/components/ui/organism/prompt.setting";

const SettingPage = () => {
  return (
    <MainLayout>
      <PromptSetting />
    </MainLayout>
  );
};

export default SettingPage;
