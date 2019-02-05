
// @flow

export type Props = {
  type: string,
  elementPosition: {
    x: number,
    y: number,
  },
  item: Object,
  editPlace?: Function,
  isModalVisible: boolean,
  handleOpenItem: Function,
  isListViewStyle?: boolean,
  handleDeleteItem: Function,
  toggleActionsModal: Function,
};

export type State = {
  isDeleteModalVisible: boolean
}
