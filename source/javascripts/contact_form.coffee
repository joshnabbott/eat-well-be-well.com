window.ContactForm = class ContactForm
  constructor: (@form, options) ->
    self = @

    @settings = $.extend(
      requiredFields: ""
      updateonsuccess: ""
      updateonfailure: ""
    , options)

    @form.submit (e) ->
      e.preventDefault()
      self.errors = []
      self.send() if self.validateInputs()

  validateInputs: ->
    self = @
    @settings.requiredFields.each (index, field) ->
      if $(field).val()
        $(field).removeClass("field_with_errors")
      else
        self.errors.push field
        $(field).addClass("field_with_errors")

    if self.errors.length is 0 then true else false

  send: ->
    self = @
    $.ajax @form.attr("action"),
      type: 'POST'
      data: @form.serialize()
      beforeSend: (xhr) ->
        xhr.setRequestHeader "Authorization", "Basic dGVlazpjYXQ="
      error: (xhr, textStatus, errorThrown) ->
        self.settings.updateOnFailure.prepend "There was a problem sending your message. Please try again."

      success: (data, textStatus, jqXHR) ->
        self.form.remove()
        self.settings.updateOnSuccess.html "<p><span>Thank you for getting in touch! I'm looking forward to understanding how I can help you reach your goals.</span></p>"

