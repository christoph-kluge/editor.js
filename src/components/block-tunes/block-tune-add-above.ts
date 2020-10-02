/**
 * @class DeleteTune
 * @classdesc Editor's default tune that moves up selected block
 *
 * @copyright <CodeX Team> 2018
 */
import {API, BlockTune} from '../../../types';
import $ from '../dom';

/**
 *
 */
export default class AddAboveTune implements BlockTune {
  /**
   * Property that contains Editor.js API methods
   *
   * @see {@link docs/api.md}
   */
  private readonly api: API;

  /**
   * Styles
   */
  private CSS = {
    button: 'ce-settings__button',
  };

  /**
   * Tune nodes
   */
  private nodes: { button: HTMLElement } = {
    button: null,
  };

  /**
   * DeleteTune constructor
   *
   * @param {API} api - Editor's API
   */
  constructor({api}) {
    this.api = api;
  }

  /**
   * Create "Delete" button and add click event listener
   *
   * @returns {HTMLElement}
   */
  public render(): HTMLElement {
    this.nodes.button = $.make('div', [this.CSS.button], {});
    this.nodes.button.appendChild($.svg('add-row-above', 16, 16));
    this.api.listeners.on(this.nodes.button, 'click', (event: MouseEvent) => this.handleClick(event), false);

    /**
     * Enable tooltip module
     */
    this.api.tooltip.onHover(this.nodes.button, this.api.i18n.t('Add block above'));

    return this.nodes.button;
  }

  /**
   * Delete block conditions passed
   *
   * @param {MouseEvent} event - click event
   */
  public handleClick(event: MouseEvent): void {
    this.api.tooltip.hide();
    this.api.toolbar.close();

    this.api.blocks.insert('paragraph', null, null, this.api.blocks.getCurrentBlockIndex(), true);
    this.api.toolbar.open();

    event.stopPropagation();
  }
}
