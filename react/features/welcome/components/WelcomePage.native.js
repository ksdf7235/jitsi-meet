import React from 'react';
import { Animated, SafeAreaView, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';

import { getName } from '../../app/functions';
import { translate } from '../../base/i18n';
import { Icon, IconWarning } from '../../base/icons';
import { LoadingIndicator, Text } from '../../base/react';
import BaseTheme from '../../base/ui/components/BaseTheme.native';
import Button from '../../base/ui/components/native/Button';
import Input from '../../base/ui/components/native/Input';
import { BUTTON_TYPES } from '../../base/ui/constants.native';
import WelcomePageTabs
    from '../../mobile/navigation/components/welcome/components/WelcomePageTabs';

import {
    type Props as AbstractProps,
    AbstractWelcomePage,
    _mapStateToProps as _abstractMapStateToProps
} from './AbstractWelcomePage';
import styles from './styles';

type Props = AbstractProps & {

    /**
     * Default prop for navigating between screen components(React Navigation).
     */
    navigation: Object,

    /**
     * The translate function.
     */
    t: Function
};

/**
 * The native container rendering the welcome page.
 *
 * @augments AbstractWelcomePage
 */
class WelcomePage extends AbstractWelcomePage<*> {
    /**
     * Constructor of the Component.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this.state._fieldFocused = false;

        this.state.isSettingsScreenFocused = false;

        this.state.roomNameInputAnimation = new Animated.Value(1);

        this.state.hintBoxAnimation = new Animated.Value(0);

        // Bind event handlers so they are only bound once per instance.
        this._onFieldFocusChange = this._onFieldFocusChange.bind(this);
        this._renderHintBox = this._renderHintBox.bind(this);

        // Specially bind functions to avoid function definition on render.
        this._onFieldBlur = this._onFieldFocusChange.bind(this, false);
        this._onFieldFocus = this._onFieldFocusChange.bind(this, true);
        this._onSettingsScreenFocused = this._onSettingsScreenFocused.bind(this);
    }

    _onFieldBlur: () => void;

    _onFieldFocus: () => void;

    _onJoin: () => void;

    _onRoomChange: (string) => void;

    _updateRoomName: () => void;

    /**
     * Implements React's {@link Component#componentDidMount()}. Invoked
     * immediately after mounting occurs. Creates a local video track if none
     * is available and the camera permission was already granted.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidMount() {
        super.componentDidMount();

        const {
            navigation,
            t
        } = this.props;

        navigation.setOptions({
            headerTitle: t('welcomepage.headerTitle')
        });

        navigation.addListener('focus', () => {
            this._updateRoomName();
        });

        navigation.addListener('blur', () => {
            this._clearTimeouts();

            this.setState({
                generatedRoomName: '',
                insecureRoomName: false,
                room: ''
            });
        });
    }

    /**
     * Implements React's {@link Component#render()}. Renders a prompt for
     * entering a room name.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        // We want to have the welcome page support the reduced UI layout,
        // but we ran into serious issues enabling it so we disable it
        // until we have a proper fix in place. We leave the code here though, because
        // this part should be fine when the bug is fixed.
        //
        // NOTE: when re-enabling, don't forget to uncomment the respective _mapStateToProps line too

        /*
        const { _reducedUI } = this.props;

        if (_reducedUI) {
            return this._renderReducedUI();
        }
        */

        return this._renderFullUI();
    }

    /**
     * Renders the insecure room name warning.
     *
     * @inheritdoc
     */
    _doRenderInsecureRoomNameWarning() {
        return (
            <View
                style = { [
                    styles.messageContainer,
                    styles.insecureRoomNameWarningContainer
                ] }>
                <Icon
                    src = { IconWarning }
                    style = { styles.insecureRoomNameWarningIcon } />
                <Text style = { styles.insecureRoomNameWarningText }>
                    { this.props.t('security.insecureRoomNameWarning') }
                </Text>
            </View>
        );
    }

    /**
     * Constructs a style array to handle the hint box animation.
     *
     * @private
     * @returns {Array<Object>}
     */
    _getHintBoxStyle() {
        return [
            styles.messageContainer,
            styles.hintContainer,
            {
                opacity: this.state.hintBoxAnimation
            }
        ];
    }

    _onFieldFocusChange: (boolean) => void;

    /**
     * Callback for when the room field's focus changes so the hint box
     * must be rendered or removed.
     *
     * @private
     * @param {boolean} focused - The focused state of the field.
     * @returns {void}
     */
    _onFieldFocusChange(focused) {
        if (focused) {
            // Stop placeholder animation.
            this._clearTimeouts();
            this.setState({
                _fieldFocused: true,
                roomPlaceholder: ''
            });
        } else {
            // Restart room placeholder animation.
            this._updateRoomName();
        }

        Animated.timing(

            this.state.hintBoxAnimation,

            {
                duration: 300,
                toValue: focused ? 1 : 0,
                useNativeDriver: true
            })
            .start(animationState =>

                animationState.finished

                && !focused
                    && this.setState({
                        _fieldFocused: false
                    }));
    }

    _onSettingsScreenFocused: boolean => void;

    /**
     * Callback for when the settings screen is focused.
     *
     * @private
     * @param {boolean} focused - The focused state of the screen.
     * @returns {void}
     */
    _onSettingsScreenFocused(focused) {
        this.setState({
            isSettingsScreenFocused: focused
        });

        this.props.navigation.setOptions({
            headerShown: !focused
        });

        Animated.timing(
            this.state.roomNameInputAnimation,
            {
                toValue: focused ? 0 : 1,
                duration: 500,
                useNativeDriver: true
            })
            .start();
    }

    _renderHintBox: () => React.ReactElement;

    /**
     * Renders the hint box if necessary.
     *
     * @private
     * @returns {React$Node}
     */
    _renderHintBox() {
        const { t } = this.props;

        if (this.state._fieldFocused) {
            return (
                <Animated.View style = { this._getHintBoxStyle() }>
                    <View style = { styles.hintTextContainer } >
                        <Text style = { styles.hintText }>
                            { t('welcomepage.roomnameHint') }
                        </Text>
                    </View>
                    <View style = { styles.hintButtonContainer } >
                        { this._renderJoinButton() }
                    </View>
                </Animated.View>
            );
        }

        return null;
    }

    /**
     * Renders the join button.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderJoinButton() {
        const { t } = this.props;
        let joinButton;


        if (this.state.joining) {
            // TouchableHighlight is picky about what its children can be, so
            // wrap it in a native component, i.e. View to avoid having to
            // modify non-native children.
            joinButton = (
                <TouchableHighlight
                    accessibilityLabel =
                        { t('welcomepage.accessibilityLabel.join') }
                    onPress = { this._onJoin }
                    style = { styles.button }>
                    <View>
                        <LoadingIndicator
                            color = { BaseTheme.palette.icon01 }
                            size = 'small' />
                    </View>
                </TouchableHighlight>
            );
        } else {
            joinButton = (
                <Button
                    accessibilityLabel = { 'welcomepage.accessibilityLabel.join' }
                    labelKey = { 'welcomepage.join' }
                    labelStyle = { styles.joinButtonLabel }
                    onClick = { this._onJoin }
                    style = { styles.buttonText }
                    type = { BUTTON_TYPES.PRIMARY } />
            );
        }

        return joinButton;
    }

    /**
     * Renders the room name input.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderRoomNameInput() {
        const roomnameAccLabel = 'welcomepage.accessibilityLabel.roomname';
        const { t } = this.props;
        const { isSettingsScreenFocused } = this.state;

        return (
            <Animated.View
                style = { [
                    isSettingsScreenFocused && styles.roomNameInputContainer,
                    { opacity: this.state.roomNameInputAnimation }
                ] }>
                <SafeAreaView style = { styles.roomContainer }>
                    <View style = { styles.joinControls } >
                        <Text style = { styles.enterRoomText }>
                            { t('welcomepage.roomname') }
                        </Text>
                        <Input
                            accessibilityLabel = { t(roomnameAccLabel) }
                            autoCapitalize = { 'none' }
                            autoComplete = { 'off' }
                            autoCorrect = { false }
                            autoFocus = { false }
                            customStyles = {{ input: styles.customInput }}
                            onBlur = { this._onFieldBlur }
                            onChange = { this._onRoomChange }
                            onFocus = { this._onFieldFocus }
                            onSubmitEditing = { this._onJoin }
                            placeholder = { this.state.roomPlaceholder }
                            returnKeyType = { 'go' }
                            value = { this.state.room } />
                        {
                            this._renderInsecureRoomNameWarning()
                        }
                        {
                            this._renderHintBox()
                        }
                    </View>
                </SafeAreaView>
            </Animated.View>
        );
    }

    /**
     * Renders the full welcome page.
     *
     * @returns {ReactElement}
     */
    _renderFullUI() {
        return (
            <>
                { this._renderRoomNameInput() }
                <View style = { styles.welcomePage }>
                    <WelcomePageTabs
                        disabled = { this.state._fieldFocused }
                        onListContainerPress = { this._onFieldBlur }
                        onSettingsScreenFocused = { this._onSettingsScreenFocused } />
                </View>
            </>
        );
    }

    /**
     * Renders a "reduced" version of the welcome page.
     *
     * @returns {ReactElement}
     */
    _renderReducedUI() {
        const { t } = this.props;

        return (
            <View style = { styles.reducedUIContainer }>
                <Text style = { styles.reducedUIText }>
                    { t('welcomepage.reducedUIText', { app: getName() }) }
                </Text>
            </View>
        );
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Object}
 */
function _mapStateToProps(state) {
    return {
        ..._abstractMapStateToProps(state)

        // _reducedUI: state['features/base/responsive-ui'].reducedUI
    };
}

export default translate(connect(_mapStateToProps)(WelcomePage));
