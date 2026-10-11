(() => {
  const STORAGE_KEY = "observation-project-scheduler-v3";

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
      id: crypto.randomUUID(),
      title: "XR 워크숍 킥오프 미팅",
      startDate: "2026-10-14",
      endDate: "2026-10-14",
      startTime: "10:00",
      endTime: "12:00",
      category: "MEETING",
      positions: ["전체"],
      members: ["전체"],
      status: "DONE",
      priority: "NORMAL",
      memo: "XR 콘텐츠 제작 워크숍 전체 마일스톤 및 팀 R&R 공유."
    },
    {
      id: crypto.randomUUID(),
      title: "스토리보드 & 프리비즈 제작 기간",
      startDate: "2026-10-14",
      endDate: "2026-10-16",
      startTime: "13:00",
      endTime: "18:00",
      category: "PLANNING",
      positions: ["연출", "레벨디자인"],
      members: ["연출", "레벨디자인"],
      status: "IN PROGRESS",
      priority: "CRITICAL",
      memo: "수업 피드백 전 스토리보드 시퀀스 및 프리비즈 블록아웃 완료."
    },
    {
      id: crypto.randomUUID(),
      title: "주간 피드백 & 씬 리뷰",
      startDate: "2026-10-23",
      endDate: "2026-10-23",
      startTime: "10:00",
      endTime: "12:00",
      category: "FEEDBACK",
      positions: ["전체"],
      members: ["전체"],
      status: "NOT STARTED",
      priority: "NORMAL",
      memo: "교수 피드백 및 다음 주 수정사항 정리."
    },
    {
      id: crypto.randomUUID(),
      title: "프로덕션 아트 에셋 집중 제작",
      startDate: "2026-10-21",
      endDate: "2026-10-23",
      startTime: "14:00",
      endTime: "17:00",
      category: "PRODUCTION",
      positions: ["아트", "레벨디자인"],
      members: ["아트", "레벨디자인"],
      status: "NOT STARTED",
      priority: "HIGH",
      memo: "관찰실 / 레벨 환경 / 소품 / XR 배경 디자인 및 에셋 검토."
    },
    {
      id: crypto.randomUUID(),
      title: "Environment & Level Lock",
      startDate: "2026-11-06",
      endDate: "2026-11-06",
      startTime: "18:00",
      endTime: "",
      category: "DEADLINE",
      positions: ["레벨디자인", "언리얼 오퍼레이터"],
      members: ["레벨디자인", "언리얼 오퍼레이터"],
      status: "NOT STARTED",
      priority: "CRITICAL",
      memo: "환경 레벨, 라이팅, 기본 ICVFX 연결 확정."
    },
    {
      id: crypto.randomUUID(),
      title: "Camera 트래킹 & ICVFX 셋업 및 테스트",
      startDate: "2026-11-12",
      endDate: "2026-11-13",
      startTime: "13:00",
      endTime: "17:00",
      category: "TEST",
      positions: ["촬영", "언리얼 오퍼레이터", "연출"],
      members: ["촬영", "언리얼 오퍼레이터", "연출"],
      status: "NOT STARTED",
      priority: "HIGH",
      memo: "렌즈 프로파일, 트래커 캘리브레이션, LED 배경 반사 및 포그 체크."
    },
    {
      id: crypto.randomUUID(),
      title: "버추얼 스튜디오 본 촬영 (Main Shoot)",
      startDate: "2026-11-19",
      endDate: "2026-11-20",
      startTime: "09:00",
      endTime: "18:00",
      category: "SHOOTING",
      positions: ["전체"],
      members: ["전체"],
      status: "NOT STARTED",
      priority: "CRITICAL",
      memo: "메인 촬영 (LED 월 실시간 연동 ICVFX 촬영)."
    },
    {
      id: crypto.randomUUID(),
      title: "포스트 프로덕션 & 컴포지팅 주간",
      startDate: "2026-11-25",
      endDate: "2026-11-27",
      startTime: "13:00",
      endTime: "18:00",
      category: "POST",
      positions: ["아트", "언리얼 오퍼레이터"],
      members: ["아트", "언리얼 오퍼레이터"],
      status: "NOT STARTED",
      priority: "HIGH",
      memo: "촬영본 컷편집, 언리얼 렌더 패스 합성 및 사운드 믹싱."
    },
    {
      id: crypto.randomUUID(),
      title: "최종 가편집본 시사회 & 피드백",
      startDate: "2026-12-04",
      endDate: "2026-12-04",
      startTime: "14:00",
      endTime: "17:00",
      category: "FEEDBACK",
      positions: ["연출", "전체"],
      members: ["연출", "전체"],
      status: "NOT STARTED",
      priority: "HIGH",
      memo: "최종 상영 전 전체 시사 및 디테일 피드백 반영."
    },
    {
      id: crypto.randomUUID(),
      title: "Final Presentation & 상영회",
      startDate: "2026-12-11",
      endDate: "2026-12-11",
      startTime: "13:00",
      endTime: "",
      category: "DEADLINE",
      positions: ["전체"],
      members: ["전체"],
      status: "NOT STARTED",
      priority: "CRITICAL",
      memo: "XR 콘텐츠 최종 제작발표회 및 상영."
    }
  ];

  const state = {
    currentDate: new Date(2026, 9, 1),
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
    template: $("eventCardTemplate")
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
    if (state.positionFilters.has("전체")) return true;
    const eventPositions = event.positions || event.members || ["전체"];
    if (eventPositions.includes("전체")) return true;
    return eventPositions.some(p => state.positionFilters.has(p));
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

        const dayNumber = document.createElement("div");
        dayNumber.className = "day-number";
        dayNumber.textContent = day.getDate();
        cell.appendChild(dayNumber);

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
        state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1, 1);
        renderMonth();
      });
    }

    if (els.nextMonthBtn) {
      els.nextMonthBtn.addEventListener("click", () => {
        state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 1);
        renderMonth();
      });
    }

    if (els.todayBtn) {
      els.todayBtn.addEventListener("click", () => {
        const now = new Date();
        state.currentDate = new Date(now.getFullYear(), now.getMonth(), 1);
        renderMonth();
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
      if (e.key === "Escape") closeDrawer();

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
      saved = {
        "1": "Observation studio xr content production phase 01",
        "2": "Environment lock & main shoot schedule finalized",
        "3": "",
        "4": ""
      };
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
