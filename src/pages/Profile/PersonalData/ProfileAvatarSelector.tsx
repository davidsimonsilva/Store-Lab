import React, { useState, useRef, useEffect, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import {
  Box,
  Typography,
  Button,
  Slider,
  IconButton,
} from '@mui/material';
import {
  UploadCloud,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RefreshCw,
} from 'lucide-react';
import { BaseModal } from '../../../components/BaseModal/BaseModal';
import { getCroppedImg } from '../../../utils/cropImage';
import {
  avatarDialogContentStyle,
  avatarDropzoneStyle,
  avatarDropzoneIconBoxStyle,
  avatarDropzoneTitleStyle,
  avatarDropzoneSubtitleStyle,
  avatarDropzoneSelectButtonStyle,
  cropperContainerStyle,
  cropperInstructionTextStyle,
  cropperCanvasStageStyle,
  cropperControlsRowStyle,
  cropperZoomSliderWrapperStyle,
  cropperActionButtonsRowStyle,
  cropperActionButtonStyle,
  cropperChangePhotoButtonStyle,
  avatarPreviewCardStyle,
  avatarPreviewInfoGroupStyle,
  avatarPreviewCircleStyle,
  avatarPreviewImageStyle,
  avatarPreviewTitleStyle,
  avatarPreviewSubtitleStyle,
  avatarRemoveButtonStyle,
} from './ProfileAvatarSelector.styles';

interface ProfileAvatarSelectorProps {
  open: boolean;
  currentAvatarUrl?: string;
  onClose: () => void;
  onSelectAvatar: (avatarUrl?: string) => void;
}

export const ProfileAvatarSelector: React.FC<ProfileAvatarSelectorProps> = ({
  open,
  currentAvatarUrl,
  onClose,
  onSelectAvatar,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(currentAvatarUrl || null);
  const [isDragOver, setIsDragOver] = useState(false);

  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setImageSrc(currentAvatarUrl || null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);
      setCroppedAreaPixels(null);
      setPreviewUrl(currentAvatarUrl || null);
    }
  }, [open, currentAvatarUrl]);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageSrc(reader.result);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const onCropComplete = useCallback((_croppedArea: Area, currentCroppedAreaPixels: Area) => {
    setCroppedAreaPixels(currentCroppedAreaPixels);
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    if (imageSrc && croppedAreaPixels) {
      getCroppedImg(imageSrc, croppedAreaPixels, rotation, 256)
        .then((url) => {
          if (isSubscribed) {
            setPreviewUrl(url);
          }
        })
        .catch((err) => {
          console.error('Erro ao atualizar pré-visualização:', err);
        });
    }
    return () => {
      isSubscribed = false;
    };
  }, [imageSrc, croppedAreaPixels, rotation]);

  const handleSave = async () => {
    if (imageSrc && croppedAreaPixels) {
      setIsProcessing(true);
      try {
        const cropped = await getCroppedImg(imageSrc, croppedAreaPixels, rotation, 512);
        onSelectAvatar(cropped);
        onClose();
      } catch (err) {
        console.error('Erro ao processar imagem final:', err);
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    onSelectAvatar(undefined);
    onClose();
  };

  const handleRemovePhoto = () => {
    setImageSrc(null);
    setPreviewUrl(null);
    onSelectAvatar(undefined);
    onClose();
  };

  const handleResetControls = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Foto de Perfil"
      maxWidth="560px"
      secondaryActionText="Cancelar"
      onSecondaryAction={onClose}
      primaryActionText={isProcessing ? "Salvando..." : "Salvar Foto"}
      onPrimaryAction={handleSave}
    >
      <Box sx={avatarDialogContentStyle}>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />

        {!imageSrc ? (
          <Box
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            sx={avatarDropzoneStyle(isDragOver)}
          >
            <Box sx={avatarDropzoneIconBoxStyle}>
              <UploadCloud size={30} />
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={avatarDropzoneTitleStyle}>
                Arraste uma foto ou clique para escolher
              </Typography>
              <Typography variant="body2" sx={avatarDropzoneSubtitleStyle}>
                Formatos suportados: JPG, PNG, WEBP ou GIF (até 10MB)
              </Typography>
            </Box>
            <Button
              variant="outlined"
              size="small"
              sx={avatarDropzoneSelectButtonStyle}
            >
              Selecionar Arquivo
            </Button>
          </Box>
        ) : (
          <Box sx={cropperContainerStyle}>
            <Typography variant="body2" sx={cropperInstructionTextStyle}>
              Arraste a imagem para enquadrar no círculo e use os controles para ajustar o zoom e a rotação:
            </Typography>

            <Box sx={cropperCanvasStageStyle}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                restrictPosition={true}
              />
            </Box>

            <Box sx={cropperControlsRowStyle}>
              <Box sx={cropperZoomSliderWrapperStyle}>
                <ZoomOut size={18} color="#64748b" />
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.05}
                  onChange={(_, val) => setZoom(val as number)}
                  size="small"
                  sx={{ flex: 1 }}
                />
                <ZoomIn size={18} color="#64748b" />
              </Box>

              <Box sx={cropperActionButtonsRowStyle}>
                <IconButton
                  size="small"
                  title="Girar 90°"
                  onClick={() => setRotation((prev) => (prev + 90) % 360)}
                  sx={cropperActionButtonStyle}
                >
                  <RotateCw size={16} />
                </IconButton>
                <IconButton
                  size="small"
                  title="Centralizar / Resetar"
                  onClick={handleResetControls}
                  sx={cropperActionButtonStyle}
                >
                  <RefreshCw size={16} />
                </IconButton>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => fileInputRef.current?.click()}
                  sx={cropperChangePhotoButtonStyle}
                >
                  Trocar Foto
                </Button>
              </Box>
            </Box>

            <Box sx={avatarPreviewCardStyle}>
              <Box sx={avatarPreviewInfoGroupStyle}>
                <Box sx={avatarPreviewCircleStyle(64)}>
                  {previewUrl ? (
                    <Box
                      component="img"
                      src={previewUrl}
                      alt="Pré-visualização do Perfil"
                      sx={avatarPreviewImageStyle}
                    />
                  ) : (
                    <Box sx={{ width: '100%', height: '100%', bgcolor: 'primary.50' }} />
                  )}
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="subtitle2" sx={avatarPreviewTitleStyle}>
                    Pré-visualização do Perfil
                  </Typography>
                  <Typography variant="caption" sx={avatarPreviewSubtitleStyle}>
                    É assim que sua foto aparecerá na sua conta e avaliações.
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="outlined"
                onClick={handleRemovePhoto}
                sx={avatarRemoveButtonStyle}
              >
                Remover foto
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </BaseModal>
  );
};

