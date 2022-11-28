# coding=utf-8
from __future__ import absolute_import
import octoprint.plugin
import octoprint.settings

class TempPresetPlugin(octoprint.plugin.StartupPlugin,
                      octoprint.plugin.TemplatePlugin,
                      octoprint.plugin.SettingsPlugin,
                      octoprint.plugin.AssetPlugin,
                      octoprint.plugin.ReloadNeedingPlugin):

    def get_assets(self):
        return dict(
            js=["js/temppreset.js"],
            css=["css/temppreset.css"]
        )

    def on_after_startup(self):
        self._logger.info("Temp Preset Loaded! (more: %s)" % self._settings.get(["temppreset_profiles"]))

    def get_settings_version(self):
        return 3

    def on_settings_migrate(self, target, current=None):
        if current is None or current < self.get_settings_version():
            self._logger.debug("Settings Migration Needed! Resetting to defaults!")
            profiles = self._settings.get(['temppreset_profiles'])
            # Migrate to 2
            #if current < 2:
            #    for profile in profiles:
            #       #This will be used later for profile updates
            # If script migration is up to date we migrate, else we reset to default
            if (self.get_settings_version() == 3):
                self._settings.set(['temppreset_profiles'], profiles)
            else:
                # Reset plug settings to defaults.
                self._settings.set(['temppreset_profiles'], self.get_settings_defaults()["temppreset_profiles"])

    def get_settings_defaults(self):
        return dict(temppreset_profiles=[{
            'name':'PLA',
            'tool_temp': '200',
            'bed_temp': '60'}])

    def get_template_configs(self):
        return [
            dict(type="settings", template="temppreset_settings.jinja2", custom_bindings=True),
            dict(type="generic", template="temppreset.jinja2", custom_bindings=True)
        ]


    ##~~ Exposed as helper
    def get_temperature_profiles(self):
        data = []
        for index, profile in enumerate(self._settings.get(['temppreset_profiles'])):
            data.append({'name': profile['name'],
                        'tool_temp': profile['tool'],
                        'bed_temp': profile['bed']})
        return data

    ##~~ Softwareupdate hook
    def get_version(self):
        return self._plugin_version

    def get_update_information(self):
        return dict(
            temppreset=dict(
                displayName="Temperature Preset",
                displayVersion=self._plugin_version,

                # version check: github repository
                type="github_release",
                user="mikedmor",
                repo="OctoPrint_Temp_Preset",
                current=self._plugin_version,

                # update method: pip
                pip="https://github.com/mikedmor/OctoPrint_Temp_Preset/archive/{target_version}.zip"
            )
        )

__plugin_name__ = "Temperature Preset"
__plugin_pythoncompat__ = ">=2.7,<4"

def __plugin_load__():
    global __plugin_implementation__
    __plugin_implementation__ = TempPresetPlugin()

    global __plugin_helpers__
    __plugin_helpers__ = dict(get_temperature_profiles=__plugin_implementation__.get_temperature_profiles)


    global __plugin_hooks__
    __plugin_hooks__ = {
        "octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
    }



