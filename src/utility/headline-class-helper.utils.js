class Headline {
  static get toolbox() {
    return {
      title: "سرفصل ها",
      icon: '<svg width="18" height="18" viewBox="0 0 18 18"><path d="M2 9h14M2 5h14M2 13h14"></path></svg>',
    };
  }

  constructor({ data, api }) {
    this.api = api;
    this.data = {
      lessons: data && data.lessons ? data.lessons : [],
    };
    this.wrapper = null;
  }

  render() {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("headline-wrapper");

    this.data.lessons.forEach((lesson, lessonIndex) => {
      const lessonContainer = this._createLessonContainer(lesson, lessonIndex);

      this.wrapper.appendChild(lessonContainer);
    });

    this._addLessonButton();

    return this.wrapper;
  }

  _createLessonContainer(lesson, lessonIndex) {
    const lessonContainer = document.createElement("div");
    lessonContainer.classList.add("headline-lesson-container");

    const lessonFieldsContainer = document.createElement("div");
    lessonFieldsContainer.className = "headline-fields-container";

    const lessonTitleInput = document.createElement("input");
    lessonTitleInput.placeholder = "عنوان سرفصل";
    lessonTitleInput.value = lesson.title;
    lessonTitleInput.className = "form-control headline-lesson-title";
    lessonTitleInput.addEventListener("input", (event) => {
      this.data.lessons[lessonIndex].title = event.target.value;
    });

    const lessonTimeInput = document.createElement("input");
    lessonTimeInput.placeholder = "مدت زمان سرفصل";
    lessonTimeInput.value = lesson.time;
    lessonTimeInput.className = "form-control headline-lesson-time";
    lessonTimeInput.addEventListener("input", (event) => {
      this.data.lessons[lessonIndex].time = event.target.value;
    });

    const removeLessonButton = document.createElement("button");
    removeLessonButton.textContent = "حذف سرفصل";
    removeLessonButton.className = "btn btn-danger my-1";
    removeLessonButton.addEventListener("click", () => {
      this.data.lessons.splice(lessonIndex, 1);
      this.wrapper.removeChild(lessonContainer);
    });

    const itemsContainer = document.createElement("div");
    itemsContainer.classList.add("headline-lessons-container");

    lesson.items.forEach((item, itemIndex) => {
      const itemContainer = this._createItemContainer(
        item,
        lessonIndex,
        itemIndex
      );

      itemsContainer.appendChild(itemContainer);
    });

    const itemInputsContainer = document.createElement("div");
    itemInputsContainer.className = "headline-inputs-container";

    const addItemButton = document.createElement("button");
    addItemButton.textContent = "افزودن آیتم";
    addItemButton.className = "btn btn-primary mt-1";
    addItemButton.addEventListener("click", () => {
      const newItem = { title: "", time: "" };
      this.data.lessons[lessonIndex].items.push(newItem);
      const itemContainer = this._createItemContainer(
        newItem,
        lessonIndex,
        lesson.items.length - 1
      );
      itemInputsContainer.appendChild(itemContainer);
      itemsContainer.appendChild(itemInputsContainer);
    });

    lessonFieldsContainer.append(lessonTitleInput);
    lessonFieldsContainer.append(lessonTimeInput);

    lessonContainer.appendChild(lessonFieldsContainer);
    lessonContainer.appendChild(removeLessonButton);
    lessonContainer.appendChild(itemsContainer);
    lessonContainer.appendChild(addItemButton);

    return lessonContainer;
  }

  _createItemContainer(item, lessonIndex, itemIndex) {
    const itemContainer = document.createElement("div");
    itemContainer.className = "headline-item-container";

    const itemFieldsContainer = document.createElement("div");
    itemFieldsContainer.className = "headline-fields-container";

    const itemTitleInput = document.createElement("input");
    itemTitleInput.placeholder = "عنوان آیتم";
    itemTitleInput.value = item.title;
    itemTitleInput.className = "form-control headline-item-title";
    itemTitleInput.addEventListener("input", (event) => {
      this.data.lessons[lessonIndex].items[itemIndex].title =
        event.target.value;
    });

    const itemTimeInput = document.createElement("input");
    itemTimeInput.placeholder = "مدت زمان آیتم";
    itemTimeInput.value = item.time;
    itemTimeInput.className = "form-control headline-item-time";
    itemTimeInput.addEventListener("input", (event) => {
      this.data.lessons[lessonIndex].items[itemIndex].time = event.target.value;
    });

    const removeItemContainer = document.createElement("div");
    removeItemContainer.className = "remove-item-container";

    const removeItemButton = document.createElement("button");
    removeItemButton.textContent = "حذف آیتم";
    removeItemButton.className = "btn btn-danger my-2";
    removeItemButton.addEventListener("click", () => {
      this.data.lessons[lessonIndex].items.splice(itemIndex, 1);
      itemContainer.parentElement.removeChild(itemContainer);
    });

    removeItemContainer.appendChild(removeItemButton);

    itemFieldsContainer.appendChild(itemTitleInput);
    itemFieldsContainer.appendChild(itemTimeInput);

    itemContainer.appendChild(itemFieldsContainer);
    itemContainer.appendChild(removeItemContainer);

    return itemContainer;
  }

  _addLessonButton() {
    const addButton = document.createElement("button");
    addButton.textContent = "افزودن سرفصل";
    addButton.className = "btn btn-primary mt-2";
    addButton.addEventListener("click", () => {
      const newLesson = { title: "", time: "", items: [] };
      this.data.lessons.push(newLesson);
      const lessonContainer = this._createLessonContainer(
        newLesson,
        this.data.lessons.length - 1
      );
      this.wrapper.insertBefore(lessonContainer, addButton);
    });

    this.wrapper.append(addButton);
  }

  save() {
    return { lessons: this.data.lessons };
  }
}

export default Headline;
