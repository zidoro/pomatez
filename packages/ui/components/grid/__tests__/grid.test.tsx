import { render, screen, testA11y } from "@/test-utils";
import Grid from "../grid";

describe("<Grid />", () => {
  test("should pass a11y test", async () => {
    await testA11y(<Grid>Grid</Grid>);
  });

  test("as - prop should work correctly", () => {
    render(
      <Grid as="ul" data-testid="list">
        <Grid.Item as="li" data-testid="list.item">
          Item 1
        </Grid.Item>
        <Grid.Item as="li" data-testid="list.item">
          Item 2
        </Grid.Item>
        <Grid.Item as="li" data-testid="list.item">
          Item 3
        </Grid.Item>
      </Grid>
    );

    const gridElement = screen.getByTestId("list");
    const gridItemElements = screen.getAllByTestId("list.item");

    expect(gridElement.nodeName).toBe("UL");
    expect(gridElement.classList).toContainEqual("pomatez-grid");

    expect(gridItemElements[0].nodeName).toBe("LI");
    expect(gridItemElements[0].classList).toContainEqual(
      "pomatez-grid-item"
    );

    expect(gridElement).toMatchInlineSnapshot(`
      <ul
        class="pz-c-bQzyIt pz-c-bQzyIt-igjAkwb-css pomatez-grid"
        data-testid="list"
      >
        <li
          class="pz-c-PJLV pz-c-PJLV-idfhWll-css pomatez-grid-item"
          data-testid="list.item"
        >
          Item 1
        </li>
        <li
          class="pz-c-PJLV pz-c-PJLV-idfhWll-css pomatez-grid-item"
          data-testid="list.item"
        >
          Item 2
        </li>
        <li
          class="pz-c-PJLV pz-c-PJLV-idfhWll-css pomatez-grid-item"
          data-testid="list.item"
        >
          Item 3
        </li>
      </ul>
    `);
  });
});
