import { shallowMount, mount } from "@vue/test-utils";
import TodoBuilder from "./TodoBuilder.vue";

describe("Description", () => {
  test("renders props.msg when passed", () => {
    console.log("Hallo");
    expect("hallo").toMatch("hallo");
    // const wrapper = mount(TodoBuilder, {});
    // expect(wrapper.text()).toMatch(msg);
  });
});

// describe("HelloWorld.vue", () => {
//   test("renders props.msg when passed", () => {
//     const msg = "new message";
//     const wrapper = shallowMount(TodoBuilder, {
//       propsData: { msg },
//     });
//     expect(wrapper.text()).toMatch(msg);
//   });
// });
