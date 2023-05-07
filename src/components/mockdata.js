
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,

  IconHome2,
  IconPlus,
} from "@tabler/icons-react";
const mockdata = [
  { link: "/dash/admin", label: "Home", icon: IconHome2 },
  { link: "/dash/admin/emp/create", label: "Create", icon: IconPlus },
  { link: "", label: "Security", icon: IconFingerprint },
  { link: "", label: "SSH Keys", icon: IconKey },
  { link: "", label: "Databases", icon: IconDatabaseImport },
  { link: "", label: "Authentication", icon: Icon2fa },
  { link: "", label: "Other Settings", icon: IconSettings },
];

export default mockdata;
