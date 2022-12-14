$(function() {
    function TempPresetViewModel(parameters) {

        let self = this;

        self.settings = parameters[0];
        self.control = parameters[1];

        self.temppreset_profiles = ko.observableArray();

        self.onBeforeBinding = function() {
            self.temppreset_profiles(self.settings.settings.plugins.temp_preset.temppreset_profiles());
        };

        self.onEventSettingsUpdated = function(payload) {
            self.temppreset_profiles(self.settings.settings.plugins.temp_preset.temppreset_profiles());
        };

        self.addTempPresetProfile = function() {
            self.settings.settings.plugins.temp_preset.temppreset_profiles.push({
                name: ko.observable('Temp '+self.temppreset_profiles().length),
                tool_temp: ko.observable('200'),
                bed_temp: ko.observable('60')});
            self.temppreset_profiles(self.settings.settings.plugins.temp_preset.temppreset_profiles());
        };

        self.removeTempPresetProfile = function(profile) {
            self.settings.settings.plugins.temp_preset.temppreset_profiles.remove(profile);
            self.temppreset_profiles(self.settings.settings.plugins.temp_preset.temppreset_profiles());
        };

        self.loadBoth = function(profile, event) {
            console.log("Loading Both: "+ko.toJS(profile).tool_temp+","+ko.toJS(profile).bed_temp);
            if($('#temperature-table > tbody > tr:nth-child(2) > td.temperature_target > form > div.input-prepend.input-append > input').prop('disabled')){
                alert("Tool is currently disabled! Are you connected to the printer?");
            }else{
                $('#temperature-table > tbody > tr:nth-child(2) > td.temperature_target > form > div.input-prepend.input-append > input').val(ko.toJS(profile).tool_temp);
                $('#temperature-table > tbody > tr:nth-child(2) > td.temperature_target > form > div.btn-group > button:nth-child(1)').click();
                $('#temperature-table > tbody > tr:nth-child(3) > td.temperature_target > form > div.input-prepend.input-append > input').val(ko.toJS(profile).bed_temp);
                $('#temperature-table > tbody > tr:nth-child(3) > td.temperature_target > form > div.btn-group > button:nth-child(1)').click();
            }
        }

        self.loadTool = function(profile, event) {
            console.log("Loading Tool: "+ko.toJS(profile).tool_temp);
            if($('#temperature-table > tbody > tr:nth-child(2) > td.temperature_target > form > div.input-prepend.input-append > input').prop('disabled')){
                alert("Tool is currently disabled! Are you connected to the printer?");
            }else{
                $('#temperature-table > tbody > tr:nth-child(2) > td.temperature_target > form > div.input-prepend.input-append > input').val(ko.toJS(profile).tool_temp);
                $('#temperature-table > tbody > tr:nth-child(2) > td.temperature_target > form > div.btn-group > button:nth-child(1)').click();
            }
        }

        self.loadBed = function(profile, event) {
            console.log("Loading Bed: "+ko.toJS(profile).bed_temp);
            if($('#temperature-table > tbody > tr:nth-child(3) > td.temperature_target > form > div.input-prepend.input-append > input').prop('disabled')){
                alert("Bed is currently disabled! Are you connected to the printer?");
            }else{
                $('#temperature-table > tbody > tr:nth-child(3) > td.temperature_target > form > div.input-prepend.input-append > input').val(ko.toJS(profile).bed_temp);
                $('#temperature-table > tbody > tr:nth-child(3) > td.temperature_target > form > div.btn-group > button:nth-child(1)').click();
            }
        }

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
