$(function() {
    function TempPresetViewModel(parameters) {

        let self = this;

        self.settings = parameters[0];
        self.control = parameters[1];

        self.multicam_profiles = ko.observableArray();
        self.enabled_buttons = ko.observableArray();

        self.selectedPreviewProfileIndex = ko.observable();

        self.onBeforeBinding = function() {
            self.temppreset_profiles(self.settings.settings.plugins.temppreset.temppreset_profiles());
        };

        self.onSettingsShown = function() {
            // Force default webcam in settings to avoid confusion
            let preSelectedProfile = 0;
            self.selectedPreviewProfileIndex(preSelectedProfile);
        };

        self.onEventSettingsUpdated = function(payload) {
            self.temppreset_profiles(self.settings.settings.plugins.temppreset.temppreset_profiles());
        };

        self.addTempPresetProfile = function() {
            self.settings.settings.plugins.temppreset.temppreset_profiles.push({
                name: ko.observable('Temp '+self.temppreset_profiles().length),
                tool_temp: ko.observable(false),
                bed_temp: ko.observable(false)});
            self.temppreset_profiles(self.settings.settings.plugins.temppreset.temppreset_profiles());
        };

        self.removeTempPresetProfile = function(profile) {
            self.settings.settings.plugins.temppreset.temppreset_profiles.remove(profile);
            self.temppreset_profiles(self.settings.settings.plugins.temppreset.temppreset_profiles());
        };

        self.loadTempuratureProfile = function(profile, event) {
            // Set webcam observables to selected webcam
            //self.settings.webcam_streamUrl(ko.toJS(profile).URL);
            //self.settings.webcam_snapshotUrl(ko.toJS(profile).snapshot);
            //self.settings.webcam_streamRatio(ko.toJS(profile).streamRatio);
            //self.settings.webcam_flipH(ko.toJS(profile).flipH);
            //self.settings.webcam_flipV(ko.toJS(profile).flipV);
            //self.settings.webcam_rotate90(ko.toJS(profile).rotate90);
            // Force reload of webcam URL with new parameters
            //let selected = OctoPrint.coreui.selectedTab;
            //OctoPrint.coreui.selectedTab = "#control";
            //self.control._enableWebcam();
            //OctoPrint.coreui.selectedTab = selected;
            // Update buttons
            //ko.utils.arrayForEach(self.multicam_profiles(), function (item) {
            //    if(profile===item) {
            //        item.isButtonEnabled(false);
            //    } else {
            //        item.isButtonEnabled(true);
            //    }
            //});
        };

        self.onAfterBinding = function() {
            var camControl = $('#tempPresetControl');
            var container = $('#temperature-table');

            camControl.insertAfter(container);
            camControl.css('display', '');
        };

    }

    OCTOPRINT_VIEWMODELS.push([
        TempPresetViewModel,
        ["settingsViewModel", "temperatureViewModel"],
        ["#settings_plugin_temp_preset_form","#tempPresetControl"]
    ]);
});
