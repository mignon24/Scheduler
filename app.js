(() => {
  const STORAGE_KEY = "observation-project-scheduler-v4";

  const categories = {
    MEETING: "#afc1de8c",     // Ice Cyan
    FEEDBACK: "#7a8ca991",    // Amber Gold
    PLANNING: "#606b828c",    // Royal Orchid
    PRODUCTION: "#474f6188",  // Luminous Aqua
    TEST: "#2b34428a",        // Warm Sunset
    SHOOTING: "#1e242d85",    // Emerald Jade
    POST: "#10131981",        // Ruby Rosé
    DEADLINE: "#0a0d1288"     // Deep Crimson Red Wine
  };

  const positions = ["전체", "연출", "레벨디자인", "촬영", "아트", "언리얼 오퍼레이터"];
  const positionColors = {
    "전체": "#ffffff",
    "연출": "#FF8383",
    "레벨디자인": "#72A9FF",
    "촬영": "#7BFF97",
    "아트": "#FFFB89",
    "언리얼 오퍼레이터": "#c084fc"
  };

  const sampleEvents = [
  {
    "id": "459e002c-6638-43a0-a42e-539a6c2d9cb4",
    "title": "Environment & Level Lock",
    "startDate": "2026-11-06",
    "endDate": "2026-11-06",
    "startTime": "18:00",
    "endTime": "",
    "category": "DEADLINE",
    "positions": [
      "레벨디자인",
      "언리얼 오퍼레이터"
    ],
    "members": [
      "레벨디자인",
      "언리얼 오퍼레이터"
    ],
    "status": "NOT STARTED",
    "priority": "CRITICAL",
    "memo": "환경 레벨, 라이팅, 기본 ICVFX 연결 확정."
  },
  {
    "id": "b0ca578a-71a7-4fd5-b786-29ddaa22e265",
    "title": "Camera 트래킹 & ICVFX 셋업 및 테스트",
    "startDate": "2026-11-12",
    "endDate": "2026-11-13",
    "startTime": "13:00",
    "endTime": "17:00",
    "category": "TEST",
    "positions": [
      "촬영",
      "언리얼 오퍼레이터",
      "연출"
    ],
    "members": [
      "촬영",
      "언리얼 오퍼레이터",
      "연출"
    ],
    "status": "NOT STARTED",
    "priority": "HIGH",
    "memo": "렌즈 프로파일, 트래커 캘리브레이션, LED 배경 반사 및 포그 체크."
  },
  {
    "id": "fa6170e8-3338-45f3-a42e-0762cf86af47",
    "title": "버추얼 스튜디오 본 촬영 (Main Shoot)",
    "startDate": "2026-11-19",
    "endDate": "2026-11-20",
    "startTime": "09:00",
    "endTime": "18:00",
    "category": "SHOOTING",
    "positions": [
      "전체"
    ],
    "members": [
      "전체"
    ],
    "status": "NOT STARTED",
    "priority": "CRITICAL",
    "memo": "메인 촬영 (LED 월 실시간 연동 ICVFX 촬영)."
  },
  {
    "id": "fe700d60-d6a6-4700-a4ea-5c6f6e5fbe61",
    "title": "포스트 프로덕션 & 컴포지팅 주간",
    "startDate": "2026-11-25",
    "endDate": "2026-11-27",
    "startTime": "13:00",
    "endTime": "18:00",
    "category": "POST",
    "positions": [
      "아트",
      "언리얼 오퍼레이터"
    ],
    "members": [
      "아트",
      "언리얼 오퍼레이터"
    ],
    "status": "NOT STARTED",
    "priority": "HIGH",
    "memo": "촬영본 컷편집, 언리얼 렌더 패스 합성 및 사운드 믹싱."
  },
  {
    "id": "5fa642f0-780b-4382-821c-51e4e8f7b954",
    "title": "최종 가편집본 시사회 & 피드백",
    "startDate": "2026-12-04",
    "endDate": "2026-12-04",
    "startTime": "14:00",
    "endTime": "17:00",
    "category": "FEEDBACK",
    "positions": [
      "연출",
      "전체"
    ],
    "members": [
      "연출",
      "전체"
    ],
    "status": "NOT STARTED",
    "priority": "HIGH",
    "memo": "최종 상영 전 전체 시사 및 디테일 피드백 반영."
  },
  {
    "id": "7f1d41d8-3a51-4e19-a866-28722093d5a7",
    "title": "Final Presentation & 상영회",
    "startDate": "2026-12-11",
    "endDate": "2026-12-11",
    "startTime": "13:00",
    "endTime": "",
    "category": "DEADLINE",
    "positions": [
      "전체"
    ],
    "members": [
      "전체"
    ],
    "status": "NOT STARTED",
    "priority": "CRITICAL",
    "memo": "XR 콘텐츠 최종 제작발표회 및 상영."
  },
  {
    "id": "3c8d1f39-d3b4-4f3d-b0e9-506fbaf350ad",
    "title": "아이디어 취합 및 스토리 방향 정리",
    "startDate": "2026-10-12",
    "endDate": "2026-10-12",
    "date": "2026-10-12",
    "category": "PLANNING",
    "startTime": "",
    "endTime": "",
    "status": "IN PROGRESS",
    "priority": "HIGH",
    "positions": [
      "전체"
    ],
    "members": [
      "전체"
    ],
    "memo": "핵심 장면, 이상현상, 연구원 행동, 가상공간 발견 사건, 엔딩, 사운드, 카메라·미장센·공간 레퍼런스 취합. 팀원 아이디어를 감독안에 반영할 항목과 보류할 항목으로 분류."
  },
  {
    "id": "8e0476bb-efa3-49c4-9b62-75913a5deccb",
    "title": "OBSERVATION Story V1 확정",
    "startDate": "2026-10-12",
    "endDate": "2026-10-12",
    "date": "2026-10-12",
    "category": "PLANNING",
    "startTime": "",
    "endTime": "",
    "status": "IN PROGRESS",
    "priority": "CRITICAL",
    "positions": [
      "연출"
    ],
    "members": [
      "연출"
    ],
    "memo": "연구 목적 / 수국-AI-연구원 관계 / 연구일지 / 이상현상 단계 / 연구원의 의심 계기 / 공간 경계 발견 / Level 01→02 Reveal / 엔딩 확정. 이후 큰 스토리 변경 최소화."
  },
  {
    "id": "a741551d-a077-4b56-b9e1-6c55cdb5a7af",
    "title": "Level 01·02 Production Design V1",
    "startDate": "2026-10-12",
    "endDate": "2026-10-13",
    "date": "2026-10-12",
    "category": "PRODUCTION",
    "startTime": "",
    "endTime": "",
    "status": "IN PROGRESS",
    "priority": "HIGH",
    "positions": [
      "연출",
      "레벨디자인",
      "아트"
    ],
    "members": [
      "연출",
      "레벨디자인",
      "아트"
    ],
    "memo": "Level 01 가짜 연구공간+자연환경 / Level 02 Observation Facility 비주얼 방향 설정. 실제 세트와 Unreal 영역 구분. 공간·아트 레퍼런스 및 필요한 에셋 후보 조사."
  },
  {
    "id": "67dbd009-30fb-417a-a477-59da8221f49e",
    "title": "전체 Sequence & Runtime 설계",
    "startDate": "2026-10-13",
    "endDate": "2026-10-13",
    "date": "2026-10-13",
    "category": "PLANNING",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "NORMAL",
    "positions": [
      "연출"
    ],
    "members": [
      "연출"
    ],
    "memo": "전체 이야기를 OBSERVE → SYNCHRONIZE → ERROR → TEST → DISCOVER → BREAK → OBSERVED 구조로 분할. 시퀀스별 예상 러닝타임 설정. 최종 영상 3분 미만 기준."
  },
  {
    "id": "c6dc2813-4e6e-4ece-a8fd-fc0efa59319e",
    "title": "Shot List V1 제작",
    "startDate": "2026-10-13",
    "endDate": "2026-10-13",
    "date": "2026-10-13",
    "category": "PLANNING",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "CRITICAL",
    "positions": [
      "연출",
      "촬영"
    ],
    "members": [
      "연출",
      "촬영"
    ],
    "memo": "전체 시퀀스를 Shot 단위로 분할. Shot Number / Duration / Shot Size / Angle / POV / 예상 Lens / Camera Movement / Actor Blocking / Tracking / IC VFX 여부 정리."
  },
  {
    "id": "27af882f-2888-4eb6-8431-ac1911cb3292",
    "title": "카메라 시점·화각·무빙 설계 V1",
    "startDate": "2026-10-13",
    "endDate": "2026-10-14",
    "date": "2026-10-13",
    "category": "SHOOTING",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "HIGH",
    "positions": [
      "연출",
      "촬영",
      "언리얼 오퍼레이터"
    ],
    "members": [
      "연출",
      "촬영",
      "언리얼 오퍼레이터"
    ],
    "memo": "POV / Surveillance / 일반 시점 구분. CU·MCU·MS·Tight FS·WS 구성. 예상 렌즈와 카메라 거리 검토. Dolly / Boom / Tracking 후보 및 Tracking 필요 Shot 표시."
  },
  {
    "id": "c8259d4a-a3bf-41ba-918f-970ffa9c8d5b",
    "title": "Art & Props Design V1",
    "startDate": "2026-10-13",
    "endDate": "2026-10-14",
    "date": "2026-10-13",
    "category": "PLANNING",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "HIGH",
    "positions": [
      "연출",
      "아트"
    ],
    "members": [
      "연출",
      "아트"
    ],
    "memo": "수국 / 화분 / 연구일지 / 실험도구 / 연구 테이블 / 연구원 의상 / 창·프레임 / 가상공간 경계 구조물의 디자인 방향과 레퍼런스 정리. 실제 제작·구매·대여 여부 구분."
  },
  {
    "id": "2a20093d-7ce9-48ec-9951-253aa768ce0c",
    "title": "전체 Storyboard V1 제작",
    "startDate": "2026-10-14",
    "endDate": "2026-10-14",
    "date": "2026-10-14",
    "category": "PLANNING",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "CRITICAL",
    "positions": [
      "연출",
      "촬영"
    ],
    "members": [
      "연출",
      "촬영"
    ],
    "memo": "전체 시퀀스를 컷 단위로 시각화. 각 컷에 Shot Number / Duration / Shot Size / Angle / 예상 Lens / Camera Movement / Actor Blocking / Tracking 여부 / IC VFX 요소 / Unreal 환경 변화 / Sound Cue 작성."
  },
  {
    "id": "54ac54e4-ccde-4816-97c5-2b5234fa401a",
    "title": "Unreal Previs V1 제작",
    "startDate": "2026-10-14",
    "endDate": "2026-10-15",
    "date": "2026-10-14",
    "category": "PRODUCTION",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "CRITICAL",
    "positions": [
      "연출",
      "레벨디자인",
      "촬영",
      "언리얼 오퍼레이터"
    ],
    "members": [
      "연출",
      "레벨디자인",
      "촬영",
      "언리얼 오퍼레이터"
    ],
    "memo": "Level 01·02 Gray Box / 연구원 Blocking / 수국·테이블 위치 / Camera / Lens / Camera Movement / Cut Timing / 환경 변화 / Level 01→02 Reveal 구현. 최종 비주얼보다 전체 영상 흐름과 촬영 설계 검증 우선."
  },
  {
    "id": "11059df9-3a2c-477b-b510-2185b6a92ee5",
    "title": "Storyboard & Previs 내부 검수",
    "startDate": "2026-10-15",
    "endDate": "2026-10-15",
    "date": "2026-10-15",
    "category": "MEETING",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "CRITICAL",
    "positions": [
      "전체"
    ],
    "members": [
      "전체"
    ],
    "memo": "10/16 교수 피드백 전 전체 검수. 스토리 전달 / 러닝타임 / 연구원 동선 / 카메라 / Tracking / IC VFX / 실제 제작 가능성 확인. 수정이 필요한 Shot과 질문사항 정리."
  },
  {
    "id": "70dab598-f760-49ba-8f1b-845d91713f1e",
    "title": "Storyboard & Previs V1 DEADLINE",
    "startDate": "2026-10-15",
    "endDate": "2026-10-15",
    "date": "2026-10-15",
    "category": "DEADLINE",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "CRITICAL",
    "positions": [
      "전체"
    ],
    "members": [
      "전체"
    ],
    "memo": "10/16 수업 피드백용 자료 최종 마감. Storyboard V1 / Previs V1 / Production Design V1 / IC VFX 핵심 장면 정리 완료."
  },
  {
    "id": "236b23bf-bf23-466e-9726-a1c16eff8e1b",
    "title": "REVIEW 01 — Storyboard / Previs",
    "startDate": "2026-10-16",
    "endDate": "2026-10-16",
    "date": "2026-10-16",
    "category": "FEEDBACK",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "NORMAL",
    "positions": [
      "전체"
    ],
    "members": [
      "전체"
    ],
    "memo": "Storyboard V1 / Previs V1 / Production Design V1 검토. 카메라 무빙 / 촬영공간 크기 / Full Shot / Tracking / 실제·가상 경계 / IC VFX 활용 / Level 01→02 Reveal 중심으로 교수 피드백 기록."
  },
  {
    "id": "4e8f08b9-bd46-428e-bbc8-857b7199689b",
    "title": "REVIEW 01 피드백 반영",
    "startDate": "2026-10-16",
    "endDate": "2026-10-18",
    "date": "2026-10-16",
    "category": "FEEDBACK",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "HIGH",
    "positions": [
      "전체"
    ],
    "members": [
      "전체"
    ],
    "memo": "교수 피드백을 연출 / 레벨 / 촬영 / 아트 / Unreal 항목으로 분류. Storyboard와 Previs 수정사항 반영. 제작 전 해결해야 할 문제와 테스트가 필요한 항목 별도 정리."
  },
  {
    "id": "9f2cb0ff-8911-4e1c-b80c-e76d79bd0ea2",
    "title": "Production Design Final",
    "startDate": "2026-10-17",
    "endDate": "2026-10-21",
    "date": "2026-10-17",
    "category": "PLANNING",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "NORMAL",
    "positions": [
      "연출",
      "레벨디자인",
      "촬영",
      "아트"
    ],
    "members": [
      "연출",
      "레벨디자인",
      "촬영",
      "아트"
    ],
    "memo": "Level 01·02 공간 구조 최종 설계. 실제 세트 / Unreal 영역 / 연구 테이블 / 수국 / 창·경계 / Observation Facility 구성 확정. 배우와 카메라 위치를 포함한 Floor Plan 제작."
  },
  {
    "id": "c385749c-1820-4a25-aff4-c899744d5bed",
    "title": "Asset & Prop List 확정",
    "startDate": "2026-10-17",
    "endDate": "2026-10-20",
    "date": "2026-10-17",
    "category": "PLANNING",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "HIGH",
    "positions": [
      "레벨디자인",
      "아트",
      "언리얼 오퍼레이터"
    ],
    "members": [
      "레벨디자인",
      "아트",
      "언리얼 오퍼레이터"
    ],
    "memo": "Unreal Asset / 수국 / 연구일지 / 실험도구 / 세트 구조물 / 의상 등 전체 제작요소 목록화. 구매 / 제작 / 대여 / 기존 Asset 활용 여부 및 담당자 지정."
  },
  {
    "id": "b456de44-b603-428d-aabf-fd53a0a1063a",
    "title": "Camera & Tracking Plan Final",
    "startDate": "2026-10-18",
    "endDate": "2026-10-21",
    "date": "2026-10-18",
    "category": "PLANNING",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "HIGH",
    "positions": [
      "연출",
      "촬영",
      "언리얼 오퍼레이터"
    ],
    "members": [
      "연출",
      "촬영",
      "언리얼 오퍼레이터"
    ],
    "memo": "각 Shot의 예상 Lens / Camera Position / Height / Movement / Actor Distance / Tracking 여부 정리. 좁은 촬영공간에서 Full Shot과 Wide Shot 구현 가능 범위 검토."
  },
  {
    "id": "179cf5c5-b875-4630-bdff-8dc1267f32e1",
    "title": "DESIGN FREEZE",
    "startDate": "2026-10-22",
    "endDate": "2026-10-22",
    "date": "2026-10-22",
    "category": "DEADLINE",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "NORMAL",
    "positions": [
      "전체"
    ],
    "members": [
      "전체"
    ],
    "memo": "Story / Storyboard V2 / Previs V2 / Production Design / Level Layout / Asset & Prop List / Camera Plan / IC VFX 핵심 4컷 확정. 이후 전체 구조를 바꾸는 큰 변경 금지."
  },
  {
    "id": "7f3fd136-3f44-40ea-964e-a05ad97cf6ce",
    "title": "REVIEW 02 — Production Design Lock",
    "startDate": "2026-10-23",
    "endDate": "2026-10-23",
    "date": "2026-10-23",
    "category": "FEEDBACK",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "NORMAL",
    "positions": [
      "전체"
    ],
    "members": [
      "전체"
    ],
    "memo": "최종 제작 설계 검수. Storyboard V2 / Previs V2 / Production Design / 실제·가상 세트 구분 / Camera Plan / IC VFX 4컷 확인. 피드백 이후 본 제작 단계 진입."
  },
  {
    "id": "12b318c4-8211-420f-a6ce-5df5e7e89847",
    "title": "Level 01 — Controlled Environment 제작",
    "startDate": "2026-10-23",
    "endDate": "2026-10-29",
    "date": "2026-10-23",
    "category": "PRODUCTION",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "HIGH",
    "positions": [
      "레벨디자인",
      "언리얼 오퍼레이터"
    ],
    "members": [
      "레벨디자인",
      "언리얼 오퍼레이터"
    ],
    "memo": "연구공간 Virtual Extension / 자연환경 / Terrain / Vegetation / Sky / Window View 제작. 실제 세트와 연결되는 부분 및 Camera Tracking에 따른 Perspective·Parallax 고려."
  },
  {
    "id": "a2bd0a0a-0ce2-45ee-9e2d-1230067410e6",
    "title": "Practical Set & Props 제작 1차",
    "startDate": "2026-10-23",
    "endDate": "2026-10-29",
    "date": "2026-10-23",
    "category": "PRODUCTION",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "HIGH",
    "positions": [
      "아트"
    ],
    "members": [
      "아트"
    ],
    "memo": "수국 / 화분 / 연구일지 / 실험도구 / 연구 테이블 Dressing / 의상 / 창·경계 구조물 제작 및 구매 시작. 실제 카메라에 노출되는 요소 우선 제작."
  },
  {
    "id": "174a179b-65fa-4c30-8d7d-f040162daebc",
    "title": "Final Previs 제작",
    "startDate": "2026-10-23",
    "endDate": "2026-10-29",
    "date": "2026-10-23",
    "category": "PRODUCTION",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "HIGH",
    "positions": [
      "연출",
      "레벨디자인",
      "촬영",
      "언리얼 오퍼레이터"
    ],
    "members": [
      "연출",
      "레벨디자인",
      "촬영",
      "언리얼 오퍼레이터"
    ],
    "memo": "확정된 Production Design 반영. 실제 촬영 기준 Camera / Lens / Actor Blocking / Camera Movement / Tracking Range / Environment Cue / IC VFX Timing 최종 검증."
  },
  {
    "id": "0e8c3d14-3aa6-4cb2-8e88-bfce45364fe6",
    "title": "REVIEW 03 — Final Previs / Production WIP",
    "startDate": "2026-10-30",
    "endDate": "2026-10-30",
    "date": "2026-10-30",
    "category": "FEEDBACK",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "HIGH",
    "positions": [
      "전체"
    ],
    "members": [
      "전체"
    ],
    "memo": "Final Previs / Level 01 WIP / Practical Art WIP / Camera·Tracking 설계 검수. 이후에는 스토리보다 실제 제작 결과물 중심으로 피드백 진행."
  },
  {
    "id": "12f0084b-bc02-497a-8a78-2a4de1f36a27",
    "title": "Level 01 Final Production",
    "startDate": "2026-10-30",
    "endDate": "2026-11-05",
    "date": "2026-10-30",
    "category": "PRODUCTION",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "HIGH",
    "positions": [
      "레벨디자인",
      "언리얼 오퍼레이터"
    ],
    "members": [
      "레벨디자인",
      "언리얼 오퍼레이터"
    ],
    "memo": "Landscape / Vegetation / Lighting / Sky / Virtual Extension 고도화. DAY / NIGHT / CLOUDY / RAIN 환경 상태 제작 및 촬영 카메라 기준 최적화."
  },
  {
    "id": "98673693-3d9a-47be-9343-ff848504a5be",
    "title": "IC VFX Environment Reaction System",
    "startDate": "2026-10-30",
    "endDate": "2026-11-05",
    "date": "2026-10-30",
    "category": "PRODUCTION",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "HIGH",
    "positions": [
      "연출",
      "레벨디자인",
      "언리얼 오퍼레이터"
    ],
    "members": [
      "연출",
      "레벨디자인",
      "언리얼 오퍼레이터"
    ],
    "memo": "연구원 상태에 따라 수국·조명·날씨·자연환경이 변화하도록 연출. NORMAL → UNEASY → STRESS → ERROR 단계별 상태 구현."
  },
  {
    "id": "0b0a9cf0-dbf3-48ec-9d7c-9308d8fca9c8",
    "title": "Practical Art 제작 2차",
    "startDate": "2026-10-30",
    "endDate": "2026-11-05",
    "date": "2026-10-30",
    "category": "PRODUCTION",
    "startTime": "",
    "endTime": "",
    "status": "NOT STARTED",
    "priority": "HIGH",
    "positions": [
      "아트"
    ],
    "members": [
      "아트"
    ],
    "memo": "1차 제작물 수정 및 실제 촬영용 퀄리티 확보. 수국 / 연구일지 / 연구도구 / 의상 / 테이블 / 경계 구조물 실물 확보 및 카메라 테스트 준비."
  }
];

  const state = {
    currentDate: new Date(2026, 9, 1),
    selectedDate: null, // "YYYY-MM-DD" 선택 시 해당 날짜의 일정만 필터링
    view: "calendar",
    events: loadEvents(),
    categoryFilters: new Set(Object.keys(categories)),
    positionFilters: new Set(["전체"])
  };

  const $ = (id) => document.getElementById(id);
  const els = {
    monthLargeTitle: $("monthLargeTitle"),
    monthNumber: $("monthNumber"),
    monthTitle: $("monthTitle"),
    calendarGrid: $("calendarGrid"),
    prevMonthBtn: $("prevMonthBtn"),
    nextMonthBtn: $("nextMonthBtn"),
    todayBtn: $("todayBtn"),
    exportBtn: $("exportBtn"),
    importBtn: $("importBtn"),
    importFileInput: $("importFileInput"),
    addScheduleBtn: $("addScheduleBtn"),
    calendarView: $("calendarView"),
    timelineView: $("timelineView"),
    timelineList: $("timelineList"),
    categoryFilters: $("categoryFilters"),
    positionFilters: $("positionFilters") || $("memberFilters"),
    visibleTaskCount: $("visibleTaskCount"),
    nextDeadlineText: $("nextDeadlineText"),
    scheduleDrawer: $("scheduleDrawer"),
    drawerBackdrop: $("drawerBackdrop"),
    closeDrawerBtn: $("closeDrawerBtn"),
    cancelBtn: $("cancelBtn"),
    deleteBtn: $("deleteBtn"),
    scheduleForm: $("scheduleForm"),
    scheduleId: $("scheduleId"),
    titleInput: $("titleInput"),
    startDateInput: $("startDateInput") || $("dateInput"),
    endDateInput: $("endDateInput") || $("dateInput"),
    categoryInput: $("categoryInput"),
    startInput: $("startInput"),
    endInput: $("endInput"),
    statusInput: $("statusInput"),
    priorityInput: $("priorityInput"),
    memoInput: $("memoInput"),
    positionChoices: $("positionChoices") || $("memberChoices"),
    drawerEyebrow: $("drawerEyebrow"),
    drawerTitle: $("drawerTitle"),
    template: $("eventCardTemplate"),
    activeDateFilterBar: $("activeDateFilterBar"),
    activeDateFilterLabel: $("activeDateFilterLabel"),
    clearDateFilterBtn: $("clearDateFilterBtn"),
    dayModalBackdrop: $("dayModalBackdrop"),
    dayScheduleModal: $("dayScheduleModal"),
    dayModalBadge: $("dayModalBadge"),
    dayModalTitle: $("dayModalTitle"),
    dayModalCount: $("dayModalCount"),
    dayModalList: $("dayModalList"),
    dayModalAddBtn: $("dayModalAddBtn"),
    closeDayModalBtn: $("closeDayModalBtn"),
    dayModalCloseBtn: $("dayModalCloseBtn"),
    dayModalFilterToggleBtn: $("dayModalFilterToggleBtn")
  };

  function loadEvents() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("observation-project-scheduler-v2");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(event => {
            const start = event.startDate || event.date || toDateString(new Date());
            const end = event.endDate || event.startDate || event.date || start;
            return {
              ...event,
              startDate: start,
              endDate: end,
              positions: event.positions || event.members || ["전체"],
              category: categories[event.category] ? event.category : "MEETING"
            };
          });
        }
      }
    } catch (err) {
      console.warn("Could not read localStorage", err);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleEvents));
    return sampleEvents;
  }

  function saveEvents() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.events));
  }

  function exportData() {
    let memos = {};
    try {
      memos = JSON.parse(localStorage.getItem(MEMO_STORAGE_KEY) || "{}");
    } catch (e) {}

    const payload = {
      version: "1.0",
      exportDate: new Date().toISOString(),
      events: state.events,
      memos: memos
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `planner-backup-${toDateString(new Date())}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importData(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const importedEvents = Array.isArray(data) ? data : data.events;
        if (!Array.isArray(importedEvents)) {
          alert("올바른 일정 데이터 파일이 아닙니다.");
          return;
        }

        state.events = importedEvents.map(event => {
          const start = event.startDate || event.date || toDateString(new Date());
          const end = event.endDate || event.startDate || event.date || start;
          return {
            ...event,
            startDate: start,
            endDate: end,
            positions: event.positions || event.members || ["전체"],
            category: categories[event.category] ? event.category : "MEETING"
          };
        });
        saveEvents();

        if (data.memos && typeof data.memos === "object") {
          localStorage.setItem(MEMO_STORAGE_KEY, JSON.stringify(data.memos));
          initPaperMemos();
        }

        render();
        alert(`일정 ${state.events.length}개를 성공적으로 불러왔습니다!`);
      } catch (err) {
        console.error(err);
        alert("파일을 읽는 도중 오류가 발생했습니다. 올바른 JSON 파일인지 확인해주세요.");
      }
    };
    reader.readAsText(file);
  }

  function toDateString(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function parseLocalDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  const WEEKDAY_NAMES_KO = ["일", "월", "화", "수", "목", "금", "토"];

  function formatDateKorean(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayOfWeek = WEEKDAY_NAMES_KO[dateObj.getDay()];
    return `${y}년 ${m}월 ${d}일 (${dayOfWeek})`;
  }

  function formatShortDate(iso) {
    if (!iso) return "";
    const [, m, d] = iso.split("-");
    return `${m}.${d}`;
  }

  function getMonthCells(anchor) {
    const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    const firstSundayIndex = first.getDay(); // 0 = Sun
    const start = new Date(first);
    start.setDate(first.getDate() - firstSundayIndex);

    const lastDay = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0);
    const totalDays = firstSundayIndex + lastDay.getDate();
    const totalCells = totalDays <= 35 ? 35 : 42;

    const cells = [];
    for (let i = 0; i < totalCells; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      cells.push(d);
    }
    return cells;
  }

  function eventMatchesFilters(event) {
    if (!state.categoryFilters.has(event.category)) return false;
    // 날짜(숫자)를 눌러 특정 날짜가 선택된 경우 해당 날짜의 일정만 필터링
    if (state.selectedDate) {
      if (event.startDate > state.selectedDate || event.endDate < state.selectedDate) {
        return false;
      }
    }
    if (state.positionFilters.has("전체")) return true;
    const eventPositions = event.positions || event.members || ["전체"];
    if (eventPositions.includes("전체")) return true;
    return eventPositions.some(p => state.positionFilters.has(p));
  }

  function getEventsForDate(iso) {
    return state.events
      .filter(event => {
        const inRange = event.startDate <= iso && event.endDate >= iso;
        if (!inRange) return false;
        if (!state.categoryFilters.has(event.category)) return false;
        if (state.positionFilters.has("전체")) return true;
        const pos = event.positions || event.members || ["전체"];
        if (pos.includes("전체")) return true;
        return pos.some(p => state.positionFilters.has(p));
      })
      .sort((a, b) => {
        const aMulti = a.startDate !== a.endDate;
        const bMulti = b.startDate !== b.endDate;
        if (aMulti !== bMulti) return aMulti ? -1 : 1;
        return (a.startTime || "00:00").localeCompare(b.startTime || "00:00");
      });
  }

  function selectDate(iso, openModal = true) {
    state.selectedDate = iso;
    render();
    if (openModal) {
      openDayScheduleModal(iso);
    }
  }

  function clearDateFilter() {
    state.selectedDate = null;
    render();
  }

  function openDayScheduleModal(iso) {
    if (!els.dayScheduleModal || !els.dayModalBackdrop) return;
    const targetDate = iso || state.selectedDate || toDateString(new Date());
    const dayEvents = getEventsForDate(targetDate);
    const [y, m, d] = targetDate.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayName = WEEKDAY_NAMES_KO[dateObj.getDay()];

    if (els.dayModalBadge) {
      els.dayModalBadge.textContent = `${y}.${String(m).padStart(2, "0")}.${String(d).padStart(2, "0")} · ${dayName}요일`;
    }
    if (els.dayModalTitle) {
      els.dayModalTitle.textContent = `${m}월 ${d}일 (${dayName})`;
    }
    if (els.dayModalCount) {
      els.dayModalCount.textContent = dayEvents.length === 0
        ? "이 날에는 등록된 일정이 없습니다."
        : `총 ${dayEvents.length}개의 일정이 진행됩니다.`;
    }

    if (els.dayModalFilterToggleBtn) {
      if (state.selectedDate === targetDate) {
        els.dayModalFilterToggleBtn.textContent = "✕ 달력 전체 일정 보기";
      } else {
        els.dayModalFilterToggleBtn.textContent = "📅 달력에서 이 날짜만 보기";
      }
    }

    renderDayModalList(dayEvents, targetDate);

    els.dayScheduleModal.classList.add("open");
    els.dayModalBackdrop.classList.add("open");
    els.dayScheduleModal.setAttribute("aria-hidden", "false");
  }

  function closeDayScheduleModal() {
    if (!els.dayScheduleModal || !els.dayModalBackdrop) return;
    els.dayScheduleModal.classList.remove("open");
    els.dayModalBackdrop.classList.remove("open");
    els.dayScheduleModal.setAttribute("aria-hidden", "true");
  }

  function renderDayModalList(dayEvents, targetDate) {
    if (!els.dayModalList) return;
    els.dayModalList.innerHTML = "";

    if (!dayEvents.length) {
      const empty = document.createElement("div");
      empty.className = "day-modal-empty";
      empty.innerHTML = `
        <div class="empty-icon">📅</div>
        <p>이 날에는 등록된 일정이 없습니다.</p>
        <button type="button" class="primary-btn mini-btn" id="emptyAddBtn">+ 이 날에 새 일정 등록</button>
      `;
      empty.querySelector("#emptyAddBtn").addEventListener("click", () => {
        closeDayScheduleModal();
        openNewDrawer(targetDate);
      });
      els.dayModalList.appendChild(empty);
      return;
    }

    dayEvents.forEach(event => {
      const card = document.createElement("div");
      card.className = "day-event-card";
      const catColor = categories[event.category] || "#afc1de8c";
      card.style.setProperty("--cat-color", catColor);

      const isMulti = event.startDate !== event.endDate;
      let timeText = "종일 일정";
      if (isMulti) {
        timeText = `${formatShortDate(event.startDate)} ~ ${formatShortDate(event.endDate)}`;
      } else if (event.startTime) {
        timeText = event.endTime ? `${event.startTime} - ${event.endTime}` : `${event.startTime} 시작`;
      }

      const posList = event.positions || event.members || ["전체"];
      const posBadges = posList.map(p => {
        const c = positionColors[p] || "#ffffff";
        return `<span class="day-pos-pill" style="--pos-color:${c}; border-color:${c}40; background:${c}15;">${escapeHtml(p)}</span>`;
      }).join("");

      card.innerHTML = `
        <div class="day-event-side-bar"></div>
        <div class="day-event-content">
          <div class="day-event-meta-top">
            <span class="day-cat-pill" style="border-color:${catColor}; color:#ffffff; background:${catColor};">${escapeHtml(event.category)}</span>
            <span class="day-time-tag">${escapeHtml(timeText)}</span>
            <span class="day-status-pill ${statusClass(event.status)}">${escapeHtml(event.status)}</span>
            <button type="button" class="day-card-delete-btn" title="일정 삭제" aria-label="일정 삭제">×</button>
          </div>
          <h4 class="day-event-title">${escapeHtml(event.title)}</h4>
          ${event.memo ? `<p class="day-event-memo">${escapeHtml(event.memo)}</p>` : ""}
          <div class="day-event-positions">${posBadges}</div>
        </div>
      `;

      // 개별 삭제 버튼
      const delBtn = card.querySelector(".day-card-delete-btn");
      if (delBtn) {
        delBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          deleteEventById(event.id);
          // 모달 목록 갱신
          openDayScheduleModal(targetDate);
        });
      }

      // 카드 클릭 시 상세 수정 드로어 오픈
      card.addEventListener("click", () => {
        closeDayScheduleModal();
        openEditDrawer(event.id);
      });

      els.dayModalList.appendChild(card);
    });
  }

  function getVisibleEvents() {
    return state.events.filter(eventMatchesFilters);
  }

  function render() {
    renderFilters();
    renderMonth();
    renderSummary();
    renderTimeline();
    renderView();
  }

  function renderFilters() {
    if (els.categoryFilters) {
      els.categoryFilters.innerHTML = "";
      Object.entries(categories).forEach(([name, color]) => {
        const label = document.createElement("label");
        label.className = "filter-item";
        label.innerHTML = `
          <input type="checkbox" ${state.categoryFilters.has(name) ? "checked" : ""} />
          <span class="filter-color" style="color:${color};background:${color}"></span>
          <span>${name}</span>
        `;
        label.querySelector("input").addEventListener("change", (e) => {
          if (e.target.checked) state.categoryFilters.add(name);
          else state.categoryFilters.delete(name);
          render();
        });
        els.categoryFilters.appendChild(label);
      });
    }

    if (els.positionFilters) {
      els.positionFilters.innerHTML = "";
      positions.forEach(name => {
        const color = positionColors[name] || "#aaa";
        const label = document.createElement("label");
        label.className = "filter-item";
        label.innerHTML = `
          <input type="checkbox" ${state.positionFilters.has(name) ? "checked" : ""} />
          <span class="filter-color" style="color:${color};background:${color}"></span>
          <span>${escapeHtml(name)}</span>
        `;
        label.querySelector("input").addEventListener("change", (e) => {
          if (name === "전체") {
            state.positionFilters = new Set(["전체"]);
          } else {
            state.positionFilters.delete("전체");
            if (e.target.checked) {
              state.positionFilters.add(name);
            } else {
              state.positionFilters.delete(name);
            }
            if (state.positionFilters.size === 0) {
              state.positionFilters.add("전체");
            }
          }
          render();
        });
        els.positionFilters.appendChild(label);
      });
    }
  }

  function layoutWeekEvents(weekDays, visibleEvents) {
    const weekStartIso = toDateString(weekDays[0]);
    const weekEndIso = toDateString(weekDays[6]);

    // 이 주(week)의 범위와 겹치는 일정들
    const weekEvents = visibleEvents.filter(e => e.startDate <= weekEndIso && e.endDate >= weekStartIso);

    const segments = weekEvents.map(event => {
      let startIdx = weekDays.findIndex(d => toDateString(d) === event.startDate);
      if (startIdx === -1) startIdx = 0; // 이전 주에서 넘어옴

      let endIdx = weekDays.findIndex(d => toDateString(d) === event.endDate);
      if (endIdx === -1) endIdx = 6; // 다음 주로 이어짐

      const span = (endIdx - startIdx) + 1;
      const isContinuationFromPrev = event.startDate < weekStartIso;
      const continuesToNext = event.endDate > weekEndIso;

      return {
        event,
        startCol: startIdx + 1, // CSS grid-column (1-indexed)
        span,
        isContinuationFromPrev,
        continuesToNext
      };
    });

    // 정렬: 여러 날에 걸친 긴 일정(span 큰 것)을 위쪽에 먼저 배치, 그 다음 시작일 빠른 순
    segments.sort((a, b) => {
      if (b.span !== a.span) return b.span - a.span;
      const cmp = a.event.startDate.localeCompare(b.event.startDate);
      if (cmp !== 0) return cmp;
      return (a.event.startTime || "").localeCompare(b.event.startTime || "");
    });

    // 충돌 없는 행(track) 배정 (Greedy Lane Packing)
    const tracks = []; // 각 row마다 7개의 boolean 슬롯
    segments.forEach(seg => {
      let placedRow = -1;
      for (let r = 0; r < tracks.length; r++) {
        let canPlace = true;
        for (let c = seg.startCol - 1; c < (seg.startCol - 1) + seg.span; c++) {
          if (tracks[r][c]) {
            canPlace = false;
            break;
          }
        }
        if (canPlace) {
          placedRow = r;
          break;
        }
      }

      if (placedRow === -1) {
        placedRow = tracks.length;
        tracks.push(new Array(7).fill(false));
      }

      for (let c = seg.startCol - 1; c < (seg.startCol - 1) + seg.span; c++) {
        tracks[placedRow][c] = true;
      }

      seg.row = placedRow + 1; // CSS grid-row (1-indexed)
    });

    return { segments, totalRows: tracks.length };
  }

  function renderMonth() {
    const y = state.currentDate.getFullYear();
    const m = state.currentDate.getMonth();
    const mShort = new Intl.DateTimeFormat("en-US", { month: "short" }).format(state.currentDate);

    if (els.monthLargeTitle) {
      els.monthLargeTitle.textContent = mShort; // e.g. "Oct"
    }
    if (els.monthNumber) {
      els.monthNumber.textContent = String(m + 1).padStart(2, "0"); // e.g. "10"
    }
    if (els.monthTitle) {
      els.monthTitle.textContent = `${new Intl.DateTimeFormat("en-US", { month: "long" }).format(state.currentDate).toUpperCase()} ${y}`;
    }
    els.calendarGrid.innerHTML = "";

    const todayIso = toDateString(new Date());
    const visible = getVisibleEvents();
    const allCells = getMonthCells(state.currentDate);

    // 7일씩 주(Week) 단위로 분할
    const weeks = [];
    for (let i = 0; i < allCells.length; i += 7) {
      weeks.push(allCells.slice(i, i + 7));
    }

    weeks.forEach(weekDays => {
      const weekRow = document.createElement("div");
      weekRow.className = "week-row";

      // 1. 날짜 배경 그리드
      const daysGrid = document.createElement("div");
      daysGrid.className = "week-days-grid";

      weekDays.forEach(day => {
        const iso = toDateString(day);
        const cell = document.createElement("div");
        cell.className = "day-cell";
        if (day.getMonth() !== m) cell.classList.add("outside");
        if (iso === todayIso) cell.classList.add("today");
        cell.dataset.date = iso;

        const dayNumber = document.createElement("button");
        dayNumber.type = "button";
        dayNumber.className = "day-number interactive-day-num";
        dayNumber.textContent = day.getDate();
        dayNumber.title = `${day.getMonth() + 1}월 ${day.getDate()}일 일정만 보기`;
        dayNumber.setAttribute("aria-label", `${day.getMonth() + 1}월 ${day.getDate()}일 일정만 보기`);

        // 날짜(숫자) 클릭 시 해당 날짜의 일정만 볼 수 있게 모달 열기 및 달력 필터 적용!
        dayNumber.addEventListener("click", (e) => {
          e.stopPropagation();
          selectDate(iso, true);
        });

        cell.appendChild(dayNumber);

        if (state.selectedDate === iso) {
          cell.classList.add("selected-day");
        }

        // 날짜 칸 더블클릭 -> 새 일정 등록
        cell.addEventListener("dblclick", () => openNewDrawer(iso));

        // Drag & drop date target
        cell.addEventListener("dragover", (e) => {
          e.preventDefault();
          if (e.dataTransfer) {
            e.dataTransfer.dropEffect = "move";
          }
          if (!cell.classList.contains("drag-over")) {
            cell.classList.add("drag-over");
          }
        });
        cell.addEventListener("dragleave", (e) => {
          if (!cell.contains(e.relatedTarget)) {
            cell.classList.remove("drag-over");
          }
        });
        cell.addEventListener("drop", (e) => {
          e.preventDefault();
          cell.classList.remove("drag-over");
          const eventId = draggedEventId || (e.dataTransfer ? (e.dataTransfer.getData("text/plain") || e.dataTransfer.getData("text")) : null);
          if (!eventId) return;
          const targetEvent = state.events.find(ev => ev.id === eventId);
          if (targetEvent) {
            const startD = parseLocalDate(targetEvent.startDate);
            const endD = parseLocalDate(targetEvent.endDate);
            const diffMs = endD.getTime() - startD.getTime();
            const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

            if (targetEvent.startDate !== iso) {
              targetEvent.startDate = iso;
              const newEndD = new Date(parseLocalDate(iso));
              newEndD.setDate(newEndD.getDate() + diffDays);
              targetEvent.endDate = toDateString(newEndD);

              saveEvents();
              render();
            }
          }
        });

        daysGrid.appendChild(cell);
      });

      weekRow.appendChild(daysGrid);

      // 2. 연속 이벤트 바 레이어
      const { segments, totalRows } = layoutWeekEvents(weekDays, visible);
      const eventsLayer = document.createElement("div");
      eventsLayer.className = "week-events-layer";

      // 행이 많으면 자동으로 weekRow 높이 확장
      if (totalRows > 3) {
        weekRow.style.minHeight = `${36 + (totalRows * 26) + 12}px`;
      }

      segments.forEach(segment => {
        eventsLayer.appendChild(createEventBar(segment));
      });

      weekRow.appendChild(eventsLayer);
      els.calendarGrid.appendChild(weekRow);
    });

    if (els.activeDateFilterBar) {
      if (state.selectedDate) {
        els.activeDateFilterBar.classList.remove("hidden");
        if (els.activeDateFilterLabel) {
          const matchCount = visible.length;
          els.activeDateFilterLabel.textContent = `${formatDateKorean(state.selectedDate)} 일정만 표시 중 (${matchCount}개)`;
        }
      } else {
        els.activeDateFilterBar.classList.add("hidden");
      }
    }
  }

  let isDraggingCard = false;
  let draggedEventId = null;

  function createEventBar(segment) {
    const { event, startCol, span, isContinuationFromPrev, continuesToNext, row } = segment;
    const bar = document.createElement("div");
    bar.className = "event-bar";
    bar.setAttribute("role", "button");
    bar.setAttribute("tabindex", "0");
    bar.setAttribute("draggable", "true");
    bar.dataset.eventId = event.id;

    const color = categories[event.category] || "#2563eb";
    bar.style.setProperty("--event-color", color);
    bar.style.gridColumn = `${startCol} / span ${span}`;
    bar.style.gridRow = `${row}`;

    if (isContinuationFromPrev) bar.classList.add("from-prev-week");
    if (continuesToNext) bar.classList.add("to-next-week");

    const posTarget = event.positions || event.members || ["전체"];
    const posText = formatPositions(posTarget);

    bar.innerHTML = `
      <span class="event-bar-title">${escapeHtml(event.title)}</span>
      ${posText ? `<span class="event-bar-meta">· ${escapeHtml(posText)}</span>` : ""}
      <button type="button" class="card-delete-btn" title="일정 삭제" aria-label="일정 삭제">×</button>
    `;

    // 삭제 버튼
    const delBtn = bar.querySelector(".card-delete-btn");
    if (delBtn) {
      delBtn.addEventListener("mousedown", (e) => e.stopPropagation());
      delBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        deleteEventById(event.id);
      });
    }

    // 드래그 핸들러
    bar.addEventListener("dragstart", (e) => {
      isDraggingCard = true;
      draggedEventId = event.id;
      if (e.dataTransfer) {
        try {
          e.dataTransfer.setData("text/plain", event.id);
          e.dataTransfer.setData("text", event.id);
          e.dataTransfer.effectAllowed = "move";
        } catch (err) { }
      }
      bar.classList.add("dragging");
    });

    bar.addEventListener("dragend", () => {
      bar.classList.remove("dragging");
      document.querySelectorAll(".day-cell.drag-over").forEach(el => el.classList.remove("drag-over"));
      setTimeout(() => {
        isDraggingCard = false;
        draggedEventId = null;
      }, 100);
    });

    bar.addEventListener("keydown", (e) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        e.stopPropagation();
        deleteEventById(event.id);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openEditDrawer(event.id);
      }
    });

    bar.addEventListener("click", (e) => {
      if (isDraggingCard) return;
      if (e.target && e.target.closest && e.target.closest(".card-delete-btn")) return;
      e.stopPropagation();
      openEditDrawer(event.id);
    });

    return bar;
  }

  function formatPositions(list) {
    if (!list?.length) return "전체";
    if (list.includes("전체")) return "전체";
    if (list.length === 1) return list[0];
    return `${list[0]} +${list.length - 1}`;
  }

  function statusClass(status) {
    return {
      "NOT STARTED": "not-started",
      "IN PROGRESS": "in-progress",
      "REVIEW": "review",
      "DONE": "done"
    }[status] || "not-started";
  }

  function renderSummary() {
    const visible = getVisibleEvents();
    els.visibleTaskCount.textContent = visible.length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextDeadline = visible
      .filter(e => e.category === "DEADLINE" && parseLocalDate(e.endDate || e.startDate) >= today)
      .sort((a, b) => (a.endDate || a.startDate).localeCompare(b.endDate || b.startDate))[0];

    if (!nextDeadline) {
      els.nextDeadlineText.textContent = "—";
    } else {
      const d = parseLocalDate(nextDeadline.endDate || nextDeadline.startDate);
      const label = `${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} ${nextDeadline.title}`;
      els.nextDeadlineText.textContent = label;
    }
  }

  function renderTimeline() {
    const visible = getVisibleEvents().slice().sort((a, b) => {
      const d = a.startDate.localeCompare(b.startDate);
      if (d !== 0) return d;
      return (a.startTime || "").localeCompare(b.startTime || "");
    });

    els.timelineList.innerHTML = "";
    if (!visible.length) {
      els.timelineList.innerHTML = `<div class="empty-state">현재 필터에 표시할 일정이 없습니다.</div>`;
      return;
    }

    const grouped = new Map();
    visible.forEach(event => {
      const d = parseLocalDate(event.startDate);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(event);
    });

    for (const [key, items] of grouped.entries()) {
      const [year, month] = key.split("-").map(Number);
      const block = document.createElement("section");
      block.className = "timeline-month";
      const title = document.createElement("div");
      title.className = "timeline-month-title";
      const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(year, month - 1, 1)).toUpperCase();
      title.textContent = `${monthName} ${year}`;
      block.appendChild(title);

      items.forEach(event => {
        const row = document.createElement("button");
        row.type = "button";
        row.className = "timeline-item";
        row.style.setProperty("--event-color", categories[event.category] || "#777");

        const isMultiDay = event.startDate !== event.endDate;
        const dateStr = isMultiDay
          ? `${formatShortDate(event.startDate)}—${formatShortDate(event.endDate)}`
          : `${formatShortDate(event.startDate)} ${event.startTime || ""}`;

        const posTarget = event.positions || event.members || ["전체"];
        row.innerHTML = `
          <div class="timeline-date">${dateStr}</div>
          <div class="timeline-line"></div>
          <div class="timeline-main">
            <div class="timeline-title">${escapeHtml(event.title)}</div>
            <div class="timeline-meta">${event.category} · ${escapeHtml(formatPositions(posTarget))}</div>
          </div>
          <div class="timeline-status">${event.status}</div>
        `;
        row.addEventListener("click", () => openEditDrawer(event.id));
        block.appendChild(row);
      });

      els.timelineList.appendChild(block);
    }
  }

  function renderView() {
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.view === state.view);
    });
    els.calendarView.classList.toggle("active", state.view === "calendar");
    els.timelineView.classList.toggle("active", state.view === "timeline");
  }

  function populateFormChoices() {
    els.categoryInput.innerHTML = "";
    Object.keys(categories).forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      els.categoryInput.appendChild(option);
    });

    els.positionChoices.innerHTML = "";
    positions.forEach(pos => {
      const label = document.createElement("label");
      label.className = "position-choice member-choice";
      label.innerHTML = `<input type="checkbox" value="${escapeHtml(pos)}" /> <span>${escapeHtml(pos)}</span>`;
      const input = label.querySelector("input");
      input.addEventListener("change", () => {
        if (pos === "전체" && input.checked) {
          els.positionChoices.querySelectorAll("input").forEach(other => {
            if (other.value !== "전체") other.checked = false;
          });
        } else if (pos !== "전체" && input.checked) {
          const allInput = [...els.positionChoices.querySelectorAll("input")].find(i => i.value === "전체");
          if (allInput) allInput.checked = false;
        }
      });
      els.positionChoices.appendChild(label);
    });
  }

  function openDrawer() {
    els.scheduleDrawer.classList.add("open");
    els.drawerBackdrop.classList.add("open");
    els.scheduleDrawer.setAttribute("aria-hidden", "false");
  }

  function closeDrawer() {
    els.scheduleDrawer.classList.remove("open");
    els.drawerBackdrop.classList.remove("open");
    els.scheduleDrawer.setAttribute("aria-hidden", "true");
  }

  function resetForm() {
    els.scheduleForm.reset();
    els.scheduleId.value = "";
    els.deleteBtn.classList.add("hidden");
    els.positionChoices.querySelectorAll("input").forEach(input => input.checked = false);
  }

  function openNewDrawer(date = toDateString(new Date())) {
    resetForm();
    els.drawerEyebrow.textContent = "NEW SCHEDULE";
    els.drawerTitle.textContent = "Add schedule";
    els.startDateInput.value = date;
    els.endDateInput.value = date;
    els.categoryInput.value = "MEETING";
    els.statusInput.value = "NOT STARTED";
    els.priorityInput.value = "NORMAL";
    const allInput = [...els.positionChoices.querySelectorAll("input")].find(i => i.value === "전체");
    if (allInput) allInput.checked = true;
    openDrawer();
    setTimeout(() => els.titleInput.focus(), 120);
  }

  function openEditDrawer(id) {
    const event = state.events.find(e => e.id === id);
    if (!event) return;
    resetForm();
    els.drawerEyebrow.textContent = "SCHEDULE DETAIL";
    els.drawerTitle.textContent = "Edit schedule";
    els.scheduleId.value = event.id;
    els.titleInput.value = event.title;
    els.startDateInput.value = event.startDate;
    els.endDateInput.value = event.endDate || event.startDate;
    els.categoryInput.value = event.category;
    els.startInput.value = event.startTime || "";
    els.endInput.value = event.endTime || "";
    els.statusInput.value = event.status;
    els.priorityInput.value = event.priority || "NORMAL";
    els.memoInput.value = event.memo || "";

    const targetPositions = event.positions || event.members || ["전체"];
    els.positionChoices.querySelectorAll("input").forEach(input => {
      input.checked = targetPositions.includes(input.value);
    });
    els.deleteBtn.classList.remove("hidden");
    openDrawer();
  }

  function collectFormEvent() {
    let start = els.startDateInput.value;
    let end = els.endDateInput.value || start;
    if (end < start) end = start; // 유효성 보정

    const selectedPositions = [...els.positionChoices.querySelectorAll("input:checked")].map(i => i.value);
    const finalPositions = selectedPositions.length ? selectedPositions : ["전체"];
    return {
      id: els.scheduleId.value || crypto.randomUUID(),
      title: els.titleInput.value.trim(),
      startDate: start,
      endDate: end,
      date: start, // 하위 호환
      category: els.categoryInput.value,
      startTime: els.startInput.value,
      endTime: els.endInput.value,
      status: els.statusInput.value,
      priority: els.priorityInput.value,
      positions: finalPositions,
      members: finalPositions,
      memo: els.memoInput.value.trim()
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = collectFormEvent();
    const index = state.events.findIndex(item => item.id === data.id);
    if (index >= 0) state.events[index] = data;
    else state.events.push(data);
    saveEvents();
    closeDrawer();

    const d = parseLocalDate(data.startDate);
    state.currentDate = new Date(d.getFullYear(), d.getMonth(), 1);
    render();
  }

  function deleteEventById(id) {
    if (!id) return;
    const exists = state.events.some(e => e.id === id);
    if (!exists) return;
    state.events = state.events.filter(e => e.id !== id);
    saveEvents();
    if (els.scheduleId && els.scheduleId.value === id) {
      closeDrawer();
    }
    render();
    if (els.dayScheduleModal && els.dayScheduleModal.classList.contains("open") && state.selectedDate) {
      openDayScheduleModal(state.selectedDate);
    }
  }

  function deleteCurrentEvent() {
    const id = els.scheduleId ? els.scheduleId.value : "";
    if (id) {
      deleteEventById(id);
    }
  }

  function escapeHtml(str = "") {
    return str.replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[ch]));
  }

  function bindEvents() {
    if (els.prevMonthBtn) {
      els.prevMonthBtn.addEventListener("click", () => {
        state.selectedDate = null;
        state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1, 1);
        renderMonth();
      });
    }

    if (els.nextMonthBtn) {
      els.nextMonthBtn.addEventListener("click", () => {
        state.selectedDate = null;
        state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 1);
        renderMonth();
      });
    }

    if (els.todayBtn) {
      els.todayBtn.addEventListener("click", () => {
        const now = new Date();
        state.selectedDate = null;
        state.currentDate = new Date(now.getFullYear(), now.getMonth(), 1);
        renderMonth();
      });
    }

    // 날짜 필터 해제 버튼 (전체 일정 보기)
    if (els.clearDateFilterBtn) {
      els.clearDateFilterBtn.addEventListener("click", clearDateFilter);
    }

    // 일일 일정 모달 버튼들
    if (els.closeDayModalBtn) {
      els.closeDayModalBtn.addEventListener("click", closeDayScheduleModal);
    }
    if (els.dayModalCloseBtn) {
      els.dayModalCloseBtn.addEventListener("click", closeDayScheduleModal);
    }
    if (els.dayModalBackdrop) {
      els.dayModalBackdrop.addEventListener("click", closeDayScheduleModal);
    }
    if (els.dayModalAddBtn) {
      els.dayModalAddBtn.addEventListener("click", () => {
        const target = state.selectedDate || toDateString(new Date());
        closeDayScheduleModal();
        openNewDrawer(target);
      });
    }
    if (els.dayModalFilterToggleBtn) {
      els.dayModalFilterToggleBtn.addEventListener("click", () => {
        if (state.selectedDate) {
          clearDateFilter();
          closeDayScheduleModal();
        } else {
          closeDayScheduleModal();
        }
      });
    }

    if (els.exportBtn) {
      els.exportBtn.addEventListener("click", exportData);
    }

    if (els.importBtn) {
      els.importBtn.addEventListener("click", () => {
        if (els.importFileInput) els.importFileInput.click();
      });
    }

    if (els.importFileInput) {
      els.importFileInput.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          importData(file);
          els.importFileInput.value = "";
        }
      });
    }

    // 시작일/종료일 스마트 동기화
    if (els.startDateInput && els.endDateInput) {
      els.startDateInput.addEventListener("change", () => {
        if (!els.endDateInput.value || els.endDateInput.value < els.startDateInput.value) {
          els.endDateInput.value = els.startDateInput.value;
        }
      });
      els.endDateInput.addEventListener("change", () => {
        if (els.endDateInput.value < els.startDateInput.value) {
          els.startDateInput.value = els.endDateInput.value;
        }
      });
    }

    if (els.addScheduleBtn) els.addScheduleBtn.addEventListener("click", () => openNewDrawer());
    if (els.closeDrawerBtn) els.closeDrawerBtn.addEventListener("click", closeDrawer);
    if (els.cancelBtn) els.cancelBtn.addEventListener("click", closeDrawer);
    if (els.drawerBackdrop) els.drawerBackdrop.addEventListener("click", closeDrawer);
    if (els.scheduleForm) els.scheduleForm.addEventListener("submit", handleSubmit);
    if (els.deleteBtn) {
      els.deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        deleteCurrentEvent();
      });
    }

    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        state.view = btn.dataset.view;
        renderView();
      });
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDrawer();
        closeDayScheduleModal();
      }

      // 상세 모달이 열려 있을 때 텍스트 입력창이 아니면 Delete / Backspace 키로 삭제
      if ((e.key === "Delete" || e.key === "Backspace") && els.scheduleDrawer.classList.contains("open")) {
        const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
        if (tag !== "input" && tag !== "textarea") {
          e.preventDefault();
          deleteCurrentEvent();
        }
      }
    });
  }

  const MEMO_STORAGE_KEY = "observation-paper-memos-v1";
  function initPaperMemos() {
    let saved = {};
    try {
      saved = JSON.parse(localStorage.getItem(MEMO_STORAGE_KEY) || "{}");
    } catch (e) { }

    // 기본 가이드 메모가 비어있으면 초기 힌트 텍스트 제공
    if (Object.keys(saved).length === 0) {
      saved = {};
    }

    document.querySelectorAll(".paper-memo-line").forEach(line => {
      const key = line.dataset.line;
      if (saved[key]) line.textContent = saved[key];
      line.addEventListener("input", () => {
        let current = {};
        try {
          current = JSON.parse(localStorage.getItem(MEMO_STORAGE_KEY) || "{}");
        } catch (e) { }
        current[key] = line.textContent.trim();
        localStorage.setItem(MEMO_STORAGE_KEY, JSON.stringify(current));
      });
    });
  }

  populateFormChoices();
  bindEvents();
  initPaperMemos();
  render();
})();
