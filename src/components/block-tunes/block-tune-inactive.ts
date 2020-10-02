/**
 * @class DeleteTune
 * @classdesc Editor's default tune that moves up selected block
 *
 * @copyright <CodeX Team> 2018
 */
import { API, BlockTune } from '../../../types';
import $ from '../dom';

/**
 *
 */
export default class InactiveTune implements BlockTune {
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
    buttonActive: 'ce-settings__button--active',
    blockDisabled: 'ce-block--disabled',
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
  constructor({ api }) {
    this.api = api;
  }

  /**
   * Create "Delete" button and add click event listener
   *
   * @returns {HTMLElement}
   */
  public render(): HTMLElement {
    const currentBlock = this.api.blocks.getBlockByIndex(this.api.blocks.getCurrentBlockIndex());

    this.nodes.button = $.make('div', [this.CSS.button], {});
    this.nodes.button.appendChild($.svg('visible', 16, 16));
    this.api.listeners.on(this.nodes.button, 'click', (event: MouseEvent) => this.handleClick(event), false);

    /**
     * Enable tooltip module
     */
    if (currentBlock.disabled === true) {
      currentBlock.holder.classList.add(this.CSS.blockDisabled);
      this.nodes.button.classList.add(this.CSS.buttonActive);
      this.api.tooltip.onHover(this.nodes.button, this.api.i18n.t('Enable'));
    } else {
      currentBlock.holder.classList.remove(this.CSS.blockDisabled);
      this.nodes.button.classList.remove(this.CSS.buttonActive);
      this.api.tooltip.onHover(this.nodes.button, this.api.i18n.t('Disable'));
    }

    return this.nodes.button;
  }

  /**
   * Delete block conditions passed
   *
   * @param {MouseEvent} event - click event
   */
  public handleClick(event: MouseEvent): void {
    const currentBlock = this.api.blocks.getBlockByIndex(this.api.blocks.getCurrentBlockIndex());

    if (currentBlock.disabled === true) {
      currentBlock.disabled = false;
      currentBlock.holder.classList.remove(this.CSS.blockDisabled);
      this.nodes.button.classList.remove(this.CSS.buttonActive);

      this.api.tooltip.hide();
      this.api.tooltip.onHover(this.nodes.button, this.api.i18n.t('Enable'));
      this.api.tooltip.show(this.nodes.button, this.api.i18n.t('Enable'));
    } else {
      currentBlock.disabled = true;
      currentBlock.holder.classList.add(this.CSS.blockDisabled);
      this.nodes.button.classList.add(this.CSS.buttonActive);

      this.api.tooltip.hide();
      this.api.tooltip.onHover(this.nodes.button, this.api.i18n.t('Disable'));
      this.api.tooltip.show(this.nodes.button, this.api.i18n.t('Disable'));
    }

    /**
     * Prevent firing ui~documentClicked that can drop currentBlock pointer
     */
    event.stopPropagation();
  }
}
